import { inject, Injectable, signal, computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Match } from '../../interfaces/match.interface';
import { Player } from '../../interfaces/player.interface';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, 'matches');

  loading = signal<boolean>(true);

  // Converts the Firestore collection data to a Signal
  // This will automatically update when the Firestore data changes
  getMatches = toSignal(
    (
      collectionData(this._collection, { idField: 'id' }) as Observable<Match[]>
    ).pipe(
      tap(() => this.loading.set(false)),
      catchError((error) => {
        this.loading.set(false);
        return throwError(() => error);
      })
    ),
    {
      initialValue: [] as Match[],
    }
  );

  // Computed property to get unique matchweeks from matches
  matchweeks = computed(() => {
    const matches = this.getMatches();
    const uniqueWeeks = new Set(matches.map((m) => m.matchweek));
    return Array.from(uniqueWeeks).sort((a, b) => a - b);
  });

  // Method to filter matches by selected week
  filteredMatches(selectedWeek: Signal<number>): Signal<Match[]> {
    return computed(() => {
      const week = selectedWeek();
      const matches = this.getMatches();
      return matches.filter((match) => match.matchweek === week);
    });
  }

  // Computed property to get players' stats
  playersStats = computed(() => {
    const matches = this.getMatches();
    const statsMap = new Map<string, Player>();

    for (const match of matches) {
      const { player1, player2, player1_points, player2_points } = match;

      if (!statsMap.has(player1)) {
        statsMap.set(player1, { name: player1, points: 0, pdf: 0, pdc: 0 });
      }
      if (!statsMap.has(player2)) {
        statsMap.set(player2, { name: player2, points: 0, pdf: 0, pdc: 0 });
      }

      const p1 = statsMap.get(player1)!;
      const p2 = statsMap.get(player2)!;

      p1.pdf += player1_points;
      p1.pdc += player2_points;

      p2.pdf += player2_points;
      p2.pdc += player1_points;

      if (player1_points > player2_points) {
        p1.points += 1;
      } else if (player2_points > player1_points) {
        p2.points += 1;
      }
    }

    return Array.from(statsMap.values()).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;

      const diffA = a.pdf - a.pdc;
      const diffB = b.pdf - b.pdc;
      if (diffB !== diffA) return diffB - diffA;

      return b.pdf - a.pdf;
    });
  });
}

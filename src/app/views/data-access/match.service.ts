import { inject, Injectable, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Match } from '../../interfaces/match.interface';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, 'matches');

  loading = signal<boolean>(true);

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

  matchweeks = computed(() => {
    const matches = this.getMatches();
    const uniqueWeeks = new Set(matches.map((m) => m.matchweek));
    return Array.from(uniqueWeeks).sort((a, b) => a - b);
  });
}

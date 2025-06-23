import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Player } from '../../interfaces/player.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, 'players');

  loading = signal<boolean>(true);

  getPlayers = toSignal(
    (
      collectionData(this._collection, { idField: 'id' }) as Observable<
        Player[]
      >
    ).pipe(
      tap(() => this.loading.set(false)),
      catchError((error) => {
        this.loading.set(false);
        return throwError(() => error);
      })
    ),
    {
      initialValue: [] as Player[],
    }
  );
}

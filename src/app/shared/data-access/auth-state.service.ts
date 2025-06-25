import { inject, Injectable } from '@angular/core';
import { Auth, authState, getAuth, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private _auth = inject(Auth);

  // Observable that emits the authentication state
  get authState$(): Observable<any> {
    return authState(this._auth);
  }

  // Getter to access the current user
  get currentUser() {
    return getAuth().currentUser;
  }

  // Method to log out the user
  logOut() {
    return signOut(this._auth);
  }
}

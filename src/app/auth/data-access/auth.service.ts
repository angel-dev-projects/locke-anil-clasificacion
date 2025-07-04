import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);

  // Sign in with email and password
  // Returns a promise that resolves with the user credentials
  signIn(user: User) {
    return signInWithEmailAndPassword(this._auth, user.email, user.password);
  }
}

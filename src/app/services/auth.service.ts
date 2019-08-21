import { firebase } from './../../environments/firebase';
import { Injectable, OnDestroy, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of, merge } from 'rxjs';
import { User } from '../model/user';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user: Observable<User>;
  user: any;
  constructor(
    private afauth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
    private ngZone: NgZone
  ) {
    this.$user = this.afauth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.afauth.authState.subscribe(user => {
      this.user = user;
    });
  }

  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.afauth.auth
      .signInWithPopup(provider)
      .then(credentials => this.updateUserData(credentials.user))
      .then(() => this.ngZone.run(() => this.router.navigate(['/'])));
  }

  async signOut() {
    await this.afauth.auth.signOut();
    return this.router.navigate(['/login']);
  }

  updateUserData({ uid, email, displayName, photoURL }: User) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(
      `user/${uid}`
    );

    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, { merge: true });
  }
  get isLoggedIn() {
    return !!this.user;
  }
}

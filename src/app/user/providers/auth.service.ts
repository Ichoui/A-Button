import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})


export class AuthService implements OnInit {

  user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, public router: Router) {
    this.user$ = afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.displayName}`).valueChanges();
        } else {
          return of(null);
        }
      }));
  }

  ngOnInit() {
  }

  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then((credential) => {
      const userAuth = firebase.auth().currentUser;
      this.updateUser(credential.user);
    });
  }

  updateUser(user) {
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.displayName}`);
    return userRef.set(data, {merge: true});
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
    // faire une redirection quand possible
  }
}

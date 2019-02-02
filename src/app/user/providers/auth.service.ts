import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { filter, first, map, switchMap, take, tap } from 'rxjs/operators';
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
        console.log(user);
        if (user) {
          this.router.navigate(['/remarques-de-cons']).then();
          return this.afs.doc<User>(`users/${user.displayName}`).valueChanges();
        } else {
          return of(null);
        }
      }));
  }

  ngOnInit() {
  }

  /*
  * Connecte l'utilisateur via popup Google
  * Utilise updateUser()
  * */
  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then((credential) => {
      const userAuth = firebase.auth().currentUser;
      this.updateUser(credential.user);
      this.router.navigate(['/remarques-de-cons']);
    });
  }

  /*
  * Permet de mettre à jour la data d'un utilisateur avec les credential Google
  * */
  updateUser(user) {
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.displayName}`);
    return userRef.set(data, {merge: true});
  }

  logout() {
    this.afAuth.auth.signOut().then();
    this.router.navigate(['/login']).then();
  }


  /*
   * Retourne si l'utilisateur est log ou non
   * True / False
   */
  isAuthenticated() {
    let user = firebase.auth().currentUser;
    return !!user;
  }
}

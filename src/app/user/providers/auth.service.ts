import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnInit {

  user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, public router: Router) {
    this.user$ = afAuth.authState.pipe(
      switchMap(user => {
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
      this.updateUser(credential.user).then();
      this.router.navigate(['/remarques-de-cons']).then();
    });
  }

  /*
  * Permet de mettre à jour la data d'un utilisateur avec les credential Google
  * */
  updateUser(user) {
    const db = firebase.firestore();
    const userDoc = db.collection('users').doc(user.displayName);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.displayName}`);

    // Vérifie si l'utilisateur existe via collection/document
    // En fonction, créé l'utilisateur et set les datas à 0 ou update l'utilisateur sans y toucher
    return userDoc.get().then(docSnapshot => {
      if (docSnapshot.exists) {
        console.log('doc existe');
        const data: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
        return userRef.set(data, {merge: true});
      } else {
        console.log('doc existe pas');
        const data: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          number: 0,
          day: 0,
          month: 0,
          year: 0,
          conName: 'Mon Con'
        };
        return userRef.set(data, {merge: true});
      }
    });
  }

  /*
* Update le nom du con de l'utilisateur ET ses creds principales (ne touche pas aux autres datas)
* */
  updateConUser(user, nameCon) {
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      conName: nameCon
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

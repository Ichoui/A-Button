import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  fireUser;
  db = firebase.firestore();

  constructor(public db: AngularFirestore) {
    this.fireUser = firebase.auth().currentUser;
  }


  // Remet les datas de compteurs des utilisateurs à 0
  resetUsers() {
    const docRef = this.db.collection('users');
    docRef.get().then(querySnapshot => {
      querySnapshot.forEach(e => {
        if (e.data().uid === '4OzCV2U2ZKflRW6M00bYCbOK0Hk1') {
          // gaetan à sauvegarder
        } else {
          docRef.doc(e.data().displayName).update({
            number: 0,
            day: 0,
            month: 0,
            year: 0
          });
        }
      });
    });
  }

  // Supprime tous les logs de remarques
  resetRemarques() {
    const docRef = this.db.collection('dataRemarques');
    const docRefCounters = this.db.collection('counters');
    docRef.get().then(querySnapshot => {
      // docRef.doc(querySnapshot.id).delete().then();
      console.log(querySnapshot.id);
    });

    docRef.doc('remarquesDay').update({
      remarkDay: 0
    });
    docRef.doc('remarquesMonth').update({
      remarkMonth: 0
    });
    docRef.doc('remarquesYear').update({
      remarkYear: 0
    });
  }

  // Supprime tous les logs de cons
  resetCons() {
    const docRef = this.db.collection('dataCons');
    const docRefCounters = this.db.collection('counters');
    docRef.get().then(querySnapshot => {
      // docRef.doc(querySnapshot.id).delete().then();
      console.log(querySnapshot.id);
    });

    docRef.doc('consDay').update({
      consDay: 0
    });
    docRef.doc('consMonth').update({
      consMonth: 0
    });
    docRef.doc('consYear').update({
      consYear: 0
    });
  }

  // Supprime tous les logs de cons perso
  resetConsPerso() {
    const docRef = this.db.collection('dataRemarquesCons');
    docRef.get().then(querySnapshot => {
      querySnapshot.forEach(e => {
        console.log(e.data());

        docRef.where('id_user', '==', 'Gaetan Gonzalez').get().then(e => {
          console.log(e);
        });

      });
    });
  }
}

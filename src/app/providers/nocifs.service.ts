import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Cons, Remarques} from './nocifs';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})

export class NocifsService {
  remarquesCollec: AngularFirestoreDocument<Cons>;
  remarques$;

  consCollec: AngularFirestoreDocument<Remarques>;
  cons$;

  constructor(public db: AngularFirestore) {
  }

// remarques
  getRemarques() {
    this.remarquesCollec = this.db.collection('remarques').doc('actualRemarques');
    return this.remarques$ = this.remarquesCollec.valueChanges();
  }

// con
  getCons() {
    this.consCollec = this.db.collection('cons').doc('actualCons');
    return this.cons$ = this.consCollec.valueChanges();
  }

  // Renvoie la date du jour sous format illisible
  getDate() {
    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const fulldate = date + '/' + month + '/' + year;
    return d;
  }

  // Renvoie la date du jour sous un array
  arrayDate() {
    const d = this.getDate();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    let array = [date, month, year];
    return array;
  }

// tempo
  todayClick(collection) {
    const today = this.getDate();
    const db = firebase.firestore();
    const docRef = db.collection(collection);
    console.log(today);
    docRef.where('time', '==', today)
      .get()
      .then(function (querySnap) {
        querySnap.forEach(function (doc) {
          console.log(doc.id, ' => ', doc.data());
        });
      });

  }

}

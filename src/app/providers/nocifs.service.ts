import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Nocifs } from './nocifs';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})

export class NocifsService {

  fireUser;
  constructor(public db: AngularFirestore) {
    this.fireUser = firebase.auth().currentUser;
  }


  countCollec: AngularFirestoreDocument;

  remarquesCollec: AngularFirestoreDocument<Nocifs>;
  remarques$;
  remarkDay$;
  remarkMonth$;
  remarkYear$;

  conPersoCollec: AngularFirestoreDocument<Nocifs>;
  conPerso$;
  conPersoDay$;
  conPersoMonth;
  conPersoYear;

  consCollec: AngularFirestoreDocument<Nocifs>;
  cons$;
  consDay$;
  consMonth$;
  consYear$;


// REMARQUES
  getRemarques() {
    this.remarquesCollec = this.db.collection('remarques').doc('actualRemarques');
    return this.remarques$ = this.remarquesCollec.valueChanges();
  }

  getRemarkDay() {
    this.countCollec = this.db.collection('counters').doc('remarquesDay');
    return this.remarkDay$ = this.countCollec.valueChanges();
  }

  getRemarkMonth() {
    this.countCollec = this.db.collection('counters').doc('remarquesMonth');
    return this.remarkMonth$ = this.countCollec.valueChanges();
  }

  getRemarkYear() {
    this.countCollec = this.db.collection('counters').doc('remarquesYear');
    return this.remarkYear$ = this.countCollec.valueChanges();
  }

  // CON PERSO REMARQUES
  getMyConRemark() {
    this.conPersoCollec = this.db.collection('users').doc(this.fireUser.displayName);
    return this.conPerso$ = this.conPersoCollec.valueChanges();
  }

  getMyConRemarkDay() {
    this.countCollec = this.db.collection('usersCounters').doc('remarquesDay'+this.fireUser.displayName);
    return this.conPersoDay$ = this.countCollec.valueChanges();
  }

  getMyConRemarkMonth() {
    this.countCollec = this.db.collection('usersCounters').doc('remarquesMonth'+this.fireUser.displayName);
    return this.conPersoMonth = this.countCollec.valueChanges();
  }

  getMyConRemarkYear() {
    this.countCollec = this.db.collection('usersCounters').doc('remarquesYear'+this.fireUser.displayName);
    return this.conPersoYear = this.countCollec.valueChanges();
  }


// CONS
  getCons() {
    this.consCollec = this.db.collection('cons').doc('actualCons');
    return this.cons$ = this.consCollec.valueChanges();
  }

  getConsDay() {
    this.countCollec = this.db.collection('counters').doc('consDay');
    return this.consDay$ = this.countCollec.valueChanges();
  }

  getConsMonth() {
    this.countCollec = this.db.collection('counters').doc('consMonth');
    return this.consMonth$ = this.countCollec.valueChanges();
  }

  getConsYear() {
    this.countCollec = this.db.collection('counters').doc('consYear');
    return this.consYear$ = this.countCollec.valueChanges();
  }

}

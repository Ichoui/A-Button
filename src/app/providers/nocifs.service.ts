import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Nocifs } from './nocifs';


@Injectable({
  providedIn: 'root'
})

export class NocifsService {
  constructor(public db: AngularFirestore) {
  }
  remarquesCollec: AngularFirestoreDocument<Nocifs>;
  remarques$;

  countCollec: AngularFirestoreDocument;
  remarkDay$;
  remarkMonth$;
  remarkYear$;

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



// CONS
  consCollec: AngularFirestoreDocument<Nocifs>;
  cons$;

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

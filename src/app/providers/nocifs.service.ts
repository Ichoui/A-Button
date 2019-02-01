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

  remarkCountCollec: AngularFirestoreDocument;
  remarkDay$;
  remarkMonth$;
  remarkYear$;



// REMARQUES
  getRemarques() {
    this.remarquesCollec = this.db.collection('remarques').doc('actualRemarques');
    return this.remarques$ = this.remarquesCollec.valueChanges();
  }

  getRemarkDay() {
    this.remarkCountCollec = this.db.collection('counters').doc('remarquesDay');
    return this.remarkDay$ = this.remarkCountCollec.valueChanges();
  }

  getRemarkMonth() {
    this.remarkCountCollec = this.db.collection('counters').doc('remarquesMonth');
    return this.remarkMonth$ = this.remarkCountCollec.valueChanges();
  }

  getRemarkYear() {
    this.remarkCountCollec = this.db.collection('counters').doc('remarquesYear');
    return this.remarkYear$ = this.remarkCountCollec.valueChanges();
  }



// CONS
  consCollec: AngularFirestoreDocument<Nocifs>;
  cons$;

  getCons() {
    this.consCollec = this.db.collection('cons').doc('actualCons');
    return this.cons$ = this.consCollec.valueChanges();
  }

}

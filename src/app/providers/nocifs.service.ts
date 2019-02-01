import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Cons, Remarques} from './nocifs';


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

}

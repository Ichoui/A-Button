import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Relou} from './relou';


@Injectable({
  providedIn: 'root'
})
export class RelouService {
  relouCollec: AngularFirestoreDocument<Relou>;
  relou$;

  constructor(public db: AngularFirestore) {
  }

  getRelou() {
    this.relouCollec = this.db.collection('relou').doc('actualRelou');
    return this.relou$ = this.relouCollec.valueChanges();
  }
}

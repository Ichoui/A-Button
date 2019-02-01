import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {A, Gris} from './nocifs';


@Injectable({
  providedIn: 'root'
})
export class NocifsService {
  relouCollec: AngularFirestoreDocument<A>;
  relou$;

  grisCollec: AngularFirestoreDocument<Gris>;
  gris$;

  constructor(public db: AngularFirestore) {
  }

  getRelou() {
    this.relouCollec = this.db.collection('relou').doc('actualRelou');
    return this.relou$ = this.relouCollec.valueChanges();
  }

  getGris() {
    this.grisCollec = this.db.collection('gris').doc('actualGris');
    return this.gris$ = this.grisCollec.valueChanges();
  }

  getDate() {
    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const fulldate = date + '/' + month + '/' + year;
    return d;
  }

}

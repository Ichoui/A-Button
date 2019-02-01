import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import {RelouService} from './relou.service';
import {Relou} from './relou';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  incrementer;
  relou: Relou;
  time;
  docRef = this.db.collection('relou').doc('actualRelou');

  // updateTimestamp = this.docRef.update({
  //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
  // });

  public listRelou: Observable<any[]>;

  constructor(public db: AngularFirestore, public relouService: RelouService) {
    this.listRelou = db.collection('/relou').valueChanges();

    this.relouService.getRelou().subscribe(i => {
      this.relou = i;
      this.incrementer = this.relou.number;
    });
  }

  ngOnInit() {
    // const db = firebase.firestore();
    // const docRef = db.collection('relou').doc('actualRelou');

    /*   const getNumber = docRef.get().then(function (doc) {
         console.log(doc.data().number);
         return doc.data().number;
       });

       console.log(getNumber);
       getNumber.then(function (e) {
         console.log(e);
       });

       console.log(this.incrementer);*/
  }

  clickRelou() {
    let addOne = this.incrementer + 1;
    this.docRef.set({
      number: addOne,
      time: 'aze'
    });
    console.log(this.incrementer);
  }

  errorButton() {

    let removeOne = this.incrementer - 1;
    if (removeOne < 0) {
      removeOne = 0;
    }
    this.docRef.set({
      number: removeOne,
      time: 'aze'
    });

    console.log(this.incrementer);
  }
}

import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  incrementer;
  time;
  // updateTimestamp = this.docRef.update({
  //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
  // });

  public listRelou: Observable<any[]>;

  constructor(public db: AngularFirestore) {
    this.listRelou = db.collection('/relou').valueChanges();
  }

  ngOnInit() {
    const db = firebase.firestore();
    const docRef = db.collection('relou').doc('actualRelou');

    const getNumber = docRef.get().then(function(doc) {
      console.log(doc.data().number);
      return doc.data().number;
    });

    const getTime = docRef.get().then(function(doc) {
      console.log(doc.data().time);
      return doc.data().time;
    });

    this.incrementer = getNumber.then(function(e) {
      return e;
    })
    console.log(this.incrementer);
  }

  clickRelou() {
    this.incrementer += 1;
    console.log(this.incrementer);
    this.db.collection('relou').doc('actualRelou');
  }

  errorButton() {
    this.incrementer -= 1;
    if (this.incrementer < 0) {
      this.incrementer = 0;
    }
    console.log(this.incrementer);
  }
}

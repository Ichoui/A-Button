import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NocifsService} from '../providers/nocifs.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {A} from '../providers/nocifs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.scss']
})
export class AComponent implements OnInit {

  incrementer;
  relou: A;
  docRef = this.db.collection('relou').doc('actualRelou');

  // updateTimestamp = this.docRef.update({
  //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
  // });

  public listRelou: Observable<any[]>;

  constructor(public db: AngularFirestore, public nocifsService: NocifsService) {
    this.listRelou = db.collection('/relou').valueChanges();

    this.nocifsService.getRelou().subscribe(i => {
      this.relou = i;
      this.incrementer = this.relou.number;
    });

  }

  ngOnInit() {
    const a =this.nocifsService.getDate();
  }

  clickRelou() {
    let addOne = this.incrementer + 1;

    this.db.collection('dataRelou').add({
      number: addOne,
      time: this.nocifsService.getDate()
    });

    this.docRef.set({
      number: addOne,
      time: this.nocifsService.getDate()
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
      time: this.nocifsService.getDate()
    });

    console.log(this.incrementer);
  }
}

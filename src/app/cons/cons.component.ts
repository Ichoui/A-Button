import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NocifsService} from '../providers/nocifs.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {Remarques} from '../providers/nocifs';

@Component({
  selector: 'app-gris',
  templateUrl: './cons.component.html',
  styleUrls: ['./cons.component.scss']
})

export class ConsComponent implements OnInit {

  incrementer;
  relou: Remarques;
  time;
  docRef = this.db.collection('cons').doc('actualCons');

  // updateTimestamp = this.docRef.update({
  //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
  // });

  public listRelou: Observable<any[]>;

  constructor(public db: AngularFirestore, public nocifsService: NocifsService) {
    this.listRelou = db.collection('/cons').valueChanges();

    this.nocifsService.getCons().subscribe(i => {
      this.relou = i;
      this.incrementer = this.relou.number;
    });
  }

  ngOnInit() {
  }

  clickRelou() {
    let addOne = this.incrementer + 1;

    this.db.collection('dataCons').add({
      number: addOne,
      time: 'aze'
    });

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

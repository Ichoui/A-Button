import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NocifsService} from '../providers/nocifs.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {Gris} from '../providers/nocifs';

@Component({
  selector: 'app-gris',
  templateUrl: './gris.component.html',
  styleUrls: ['./gris.component.scss']
})

export class GrisComponent implements OnInit {

  incrementer;
  relou: Gris;
  time;
  docRef = this.db.collection('gris').doc('actualGris');

  // updateTimestamp = this.docRef.update({
  //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
  // });

  public listRelou: Observable<any[]>;

  constructor(public db: AngularFirestore, public nocifsService: NocifsService) {
    this.listRelou = db.collection('/gris').valueChanges();

    this.nocifsService.getGris().subscribe(i => {
      this.relou = i;
      this.incrementer = this.relou.number;
    });
  }

  ngOnInit() {
  }

  clickRelou() {
    let addOne = this.incrementer + 1;

    this.db.collection('dataGris').add({
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

import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NocifsService} from '../providers/nocifs.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {Cons} from '../providers/nocifs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-a',
  templateUrl: './remarques.component.html',
  styleUrls: ['./remarques.component.scss']
})
export class RemarquesComponent implements OnInit {

  incrementer;
  relou: Cons;
  docRef = this.db.collection('remarques').doc('actualRemarques');
  todayClicks;


  public listRelou: Observable<any[]>;

  constructor(public db: AngularFirestore, public nocifsService: NocifsService) {
    this.listRelou = db.collection('/remarques').valueChanges();

    this.nocifsService.getRemarques().subscribe(i => {
      this.relou = i;
      this.incrementer = this.relou.number;
    });

  }

  ngOnInit() {
    this.nocifsService.todayClick('dataRemarques');
    const a =this.nocifsService.getDate();
    const b = this.nocifsService.arrayDate();
    console.log(a)
    console.log(b)
  }

  clickRelou() {
    let addOne = this.incrementer + 1;

    this.db.collection('dataRemarques').add({
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

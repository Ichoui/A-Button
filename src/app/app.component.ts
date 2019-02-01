import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  relouIncrement;

  public listRelou: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.listRelou = db.collection('/relou').valueChanges();
  }

  ngOnInit() {
  }

  clickRelou() {
    console.log('e');
  }
}

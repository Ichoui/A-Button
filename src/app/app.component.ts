import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import {firesettings } from '../environments/firebase';
const settings = {timestampsInSnapshots: true};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  relouIncrement;

  ngOnInit() {
    firebase.initializeApp(firesettings);
    firebase.firestore().settings(settings);
  }

  clickRelou() {
    console.log('e');
  }
}

import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {NocifsService} from './nocifs.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor(public db: AngularFirestore) {}

  // Renvoie la date du jour sous format illisible
  getDate() {
    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const fulldate = date + '/' + month + '/' + year;
    return d;
  }

  // Renvoie la date du jour sous un array
  arrayDate() {
    const d = this.getDate();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return [date, month, year];
  }

  // Renvoie la date du jour lisible
  dateLisible() {
    const d = this.arrayDate();
    return d[0] + '/' + d[1] + '/' + d[2];
  }

  // fonctions qui retournent date, mois et années
  dayDate() {
    const d = this.arrayDate();
    return d[0];
  }

  monthDate() {
    const d = this.arrayDate();
    return d[1];
  }

  yearDate() {
    const d = this.arrayDate();
    return d[2];
  }


  // tempo
  daily(collection) {
    const today = this.arrayDate();

    const db = firebase.firestore();
    const docRef = db.collection(collection);
    console.log(today);
    docRef.where('day', '==', today[0])
      .get()
      .then(function (querySnap) {
        querySnap.forEach(function (doc) {
          console.log('Same day => ', doc.data());
        });
      });
  }

  monthly(collection) {
    const month = this.arrayDate();

    const db = firebase.firestore();
    const docRef = db.collection(collection);
    console.log(month);
    docRef.where('month', '==', month[1])
      .get()
      .then(function (querySnap) {
        querySnap.forEach(function (doc) {
          console.log('Same month => ', doc.data());
        });
      });
  }

  yearly(collection) {
    const year = this.arrayDate();

    const db = firebase.firestore();
    const docRef = db.collection(collection);
    console.log(year);
    docRef.where('year', '==', year[2])
      .get()
      .then(function (querySnap) {
        querySnap.forEach(function (doc) {
          console.log('Same year => ', doc.data());
        });
      });
  }
}

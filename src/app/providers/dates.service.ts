import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

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
    return d;
  }

  // Renvoie la date du jour sous un array
  // Format : [1, 8, 2019]
  arrayDate() {
    const d = this.getDate();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return [date, month, year];
  }

  // Renvoie la date du jour lisible
  // Format : 2/10/2019   12/8/2018
  dateLisible() {
    const d = this.arrayDate();
    return d[0] + '/' + d[1] + '/' + d[2];
  }

  // fonctions qui retournent date, mois et années
  // Format : 1 2 3 ..
  dayDate() {
    const d = this.arrayDate();
    return d[0];
  }

  // Format : 9 12
  monthDate() {
    const d = this.arrayDate();
    return d[1];
  }

  // Format : 2019
  yearDate() {
    const d = this.arrayDate();
    return d[2];
  }

  // Compte le nombre de document dans la collection passée en paramètres
  //  jours / mois / annnées
  daily(collection) {
    const today = this.arrayDate();
    let counter = 0;
    const db = firebase.firestore();
    const docRef = db.collection(collection);
    // console.log(today);
   return docRef.where('day', '==', today[0])
      .get()
      .then(function (querySnap) {
        querySnap.forEach(function (doc) {
          counter += 1;
          // console.log('Same day => ', doc.data());
        });
        return counter;
      });
  }

  monthly(collection) {
    const month = this.arrayDate();
    let counter = 0;

    const db = firebase.firestore();
    const docRef = db.collection(collection);
    return docRef.where('month', '==', month[1])
      .get()
      .then(function (querySnap) {
        querySnap.forEach(function (doc) {
          counter += 1;
          // console.log('Same month => ', doc.data());
        });
        return counter;

      });
  }

  yearly(collection) {
    const year = this.arrayDate();
    let counter = 0;

    const db = firebase.firestore();
    const docRef = db.collection(collection);
    return docRef.where('year', '==', year[2])
      .get()
      .then(function (querySnap) {
        querySnap.forEach(function (doc) {
          counter += 1;
          // console.log('Same year => ', doc.data());
        });
        return counter;
      });
  }
}

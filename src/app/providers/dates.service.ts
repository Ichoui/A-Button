import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  fireUser;

  constructor(public db: AngularFirestore) {
    this.fireUser = firebase.auth().currentUser;
  }

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

  // Compte le nombre de document présent dans la collection passée en paramètres, permet de track le nombre de clics
  // Paramètre user optionnel (gère le cas d'un user connecté qui alimente ses datas de clics perso)
  //  jours / mois / annnées
  daily(collection, user?) {
    const today = this.arrayDate();
    const db = firebase.firestore();
    let counter = 0;
    const docRef = db.collection(collection);
    // const docRefConPerso = db.collection(collection).doc(this.fireUser.displayName).collection('dataPerso'); // Not available subcollection

    if (user !== undefined) {
      return docRef
        .where('id_user', '==', user)
        .where('day', '==', today[0])
        .get()
        .then(function (querySnap) {
          querySnap.forEach(function (doc) {
            counter += 1;
            // console.log('Same day => ', doc.data());
          });
          return counter;
        });
    } else {
      return docRef
        .where('day', '==', today[0])
        .get()
        .then(function (querySnap) {
          querySnap.forEach(function (doc) {
            counter += 1;
            // console.log('Same day => ', doc.data());
          });
          return counter;
        });
    }
  }

  monthly(collection, user?) {
    const month = this.arrayDate();
    let counter = 0;
    const db = firebase.firestore();
    const docRef = db.collection(collection);

    if (user !== undefined) {
      return docRef
        .where('id_user', '==', user)
        .where('month', '==', month[1])
        .get()
        .then(function (querySnap) {
          querySnap.forEach(function (doc) {
            counter += 1;
            // console.log('Same month => ', doc.data());
          });
          return counter;
        });
    } else {
      return docRef
        .where('month', '==', month[1])
        .get()
        .then(function (querySnap) {
          querySnap.forEach(function (doc) {
            counter += 1;
            // console.log('Same day => ', doc.data());
          });
          return counter;
        });
    }
  }

  yearly(collection, user?) {
    const year = this.arrayDate();
    let counter = 0;
    const db = firebase.firestore();
    const docRef = db.collection(collection);

    if (user !== undefined) {
      return docRef
        .where('id_user', '==', user)
        .where('year', '==', year[2])
        .get()
        .then(function (querySnap) {
          querySnap.forEach(function (doc) {
            counter += 1;
            // console.log('Same year => ', doc.data());
          });
          return counter;
        });
    } else {
      return docRef
        .where('year', '==', year[2])
        .get()
        .then(function (querySnap) {
          querySnap.forEach(function (doc) {
            counter += 1;
            // console.log('Same day => ', doc.data());
          });
          return counter;
        });
    }
  }
}

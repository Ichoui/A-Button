import { Component, OnInit } from '@angular/core';
import { NocifsService } from '../providers/nocifs.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { DatesService } from '../providers/dates.service';
import * as firebase from 'firebase';
import { User } from '../user/providers/user';
import { AuthService } from '../user/providers/auth.service';

@Component({
  selector: 'app-conperso',
  templateUrl: './conperso.component.html',
  styleUrls: ['./conperso.component.scss']
})
export class ConpersoComponent implements OnInit {

  incrementer;
  docRef = this.db.collection('users');
  docCountDay = this.db.collection('counters').doc('remarquesDay');
  docCountMonth = this.db.collection('counters').doc('remarquesMonth');
  docCountYear = this.db.collection('counters').doc('remarquesYear');
  myConRemarkDay;
  myConRemarkMonth;
  myConRemarkYear;

  user: User;
  fireUser;

  constructor(public db: AngularFirestore, public nocifsService: NocifsService, public datesService: DatesService, public auth: AuthService) {
    // Observable qui consomme le nocif service approprié et l'endroit à la vue
    this.nocifsService.getMyConRemark().subscribe(i => {
      this.incrementer = i.number;
    });

    this.nocifsService.getMyConRemarkDay().subscribe(i => {
      this.myConRemarkDay = i.remarkDay;
    });

    this.nocifsService.getMyConRemarkMonth().subscribe(i => {
      this.myConRemarkMonth = i.remarkMonth;
    });

    this.nocifsService.getMyConRemarkYear().subscribe(i => {
      this.myConRemarkYear = i.remarkYear;
    });
  }

  ngOnInit() {
    this.counters();
    const dateIllisible = this.datesService.getDate();
    const dateArray = this.datesService.arrayDate();
    const dateLisible = this.datesService.dateLisible();

    // this.auth.user$.subscribe(user => this.user = user);
    this.fireUser = firebase.auth().currentUser;
    // console.log(this.fireUser);
  }

  counters() {
    this.datesService.daily('dataRemarques').then(async (data) => {
      this.docCountDay.set({
        remarkDay: data
      });
    });

    this.datesService.monthly('dataRemarques').then(async (data) => {
      this.docCountMonth.set({
        remarkMonth: data
      });
    });

    this.datesService.yearly('dataRemarques').then(async (data) => {
      this.docCountYear.set({
        remarkYear: data
      });
    });
  }

  conPersoClick() {
    let addOne = this.incrementer + 1;
    // Ajouter dans les data tracks
    this.db.collection('dataRemarques').add({
      number: addOne,
      date: this.datesService.getDate(),
      dateLisible: this.datesService.dateLisible(),
      day: this.datesService.dayDate(),
      month: this.datesService.monthDate(),
      year: this.datesService.yearDate()
    });

    // Ajoute un au compteur général et met à jour la data principale
    this.docRef.doc(this.fireUser.displayName).update({
      number: addOne,
      date: this.datesService.getDate(),
      dateLisible: this.datesService.dateLisible(),
      day: this.datesService.dayDate(),
      month: this.datesService.monthDate(),
      year: this.datesService.yearDate()
    });
    this.counters();

  }

  errorConPersoClick() {
    let removeOne = this.incrementer - 1;
    if (removeOne < 0) {
      removeOne = 0;
    }
    const db = firebase.firestore();
    const docRef = db.collection('dataRemarques');
    console.log(removeOne);
    docRef.where('number', '==', removeOne + 1).limit(1).get().then(querySnap => {
      querySnap.forEach(e => {
        console.log(e.data());
        docRef.doc(e.id).delete().then();
        this.counters();
      });
    });
    // update les compteurs visuellement
    // Remove un au compteur général et met à jour la data principale
    this.docRef.doc(this.fireUser.displayName).update({
      number: removeOne,
      date: this.datesService.getDate(),
      dateLisible: this.datesService.dateLisible(),
      day: this.datesService.dayDate(),
      month: this.datesService.monthDate(),
      year: this.datesService.yearDate()
    });
  }
}

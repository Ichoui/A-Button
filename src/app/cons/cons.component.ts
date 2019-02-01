import { Component, Input, OnInit, Output } from '@angular/core';
import { NocifsService } from '../providers/nocifs.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { DatesService } from '../providers/dates.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-cons',
  templateUrl: './cons.component.html',
  styleUrls: ['./cons.component.scss']
})

export class ConsComponent implements OnInit {


  incrementer;
  // remarques: Nocifs;
  docRef = this.db.collection('cons').doc('actualCons');
  docCountDay = this.db.collection('counters').doc('consDay');
  docCountMonth = this.db.collection('counters').doc('consMonth');
  docCountYear = this.db.collection('counters').doc('consYear');
  consDay;
  consMonth;
  consYear;


  constructor(public db: AngularFirestore, public nocifsService: NocifsService, public datesService: DatesService) {
    // Observable qui consomme le nocif service approprié et l'endroit à la vue
    this.nocifsService.getCons().subscribe(i => {
      this.incrementer = i.number;
    });

    this.nocifsService.getConsDay().subscribe(i => {
      this.consDay = i.consDay;
    });

    this.nocifsService.getConsMonth().subscribe(i => {
      this.consMonth = i.consMonth;
    });

    this.nocifsService.getConsYear().subscribe(i => {
      this.consYear = i.consYear;
    });
  }

  ngOnInit() {
    this.counters();
    const dateIllisible = this.datesService.getDate();
    const dateArray = this.datesService.arrayDate();
    const dateLisible = this.datesService.dateLisible();
    // console.log(dateArray);
    // console.log(dateLisible);
  }

  counters() {
    this.datesService.daily('dataCons').then(async (data) => {
      this.docCountDay.set({
        remarkDay: data
      });
    });

    this.datesService.monthly('dataCons').then(async (data) => {
      this.docCountMonth.set({
        remarkMonth: data
      });
    });

    this.datesService.yearly('dataCons').then(async (data) => {
      this.docCountYear.set({
        remarkYear: data
      });
    });
  }

  clickRelou() {
    const addOne = this.incrementer + 1;

    // Ajouter dans les data tracks
    this.db.collection('dataCons').add({
      number: addOne,
      date: this.datesService.getDate(),
      dateLisible: this.datesService.dateLisible(),
      day: this.datesService.dayDate(),
      month: this.datesService.monthDate(),
      year: this.datesService.yearDate()
    });

    // Ajoute un au compteur général et met à jour la data principale
    this.docRef.set({
      number: addOne,
      date: this.datesService.getDate(),
      dateLisible: this.datesService.dateLisible(),
      day: this.datesService.dayDate(),
      month: this.datesService.monthDate(),
      year: this.datesService.yearDate()
    });
    this.counters();

  }

  errorButton() {
    let removeOne = this.incrementer - 1;
    if (removeOne < 0) {
      removeOne = 0;
    }
    // Remove un au compteur général et met à jour la data principale
    this.docRef.set({
      number: removeOne,
      date: this.datesService.getDate(),
      dateLisible: this.datesService.dateLisible(),
      day: this.datesService.dayDate(),
      month: this.datesService.monthDate(),
      year: this.datesService.yearDate()
    });

    const db = firebase.firestore();
    const docRef = db.collection('dataCons');
    docRef.where('number', '==', removeOne).get().then(querySnap => {
      querySnap.forEach(e => {
        docRef.doc(e.id).delete();
      });
    });
    this.counters();
  }

}
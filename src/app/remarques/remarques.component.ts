import { Component, Injectable, OnInit } from '@angular/core';
import { NocifsService } from '../providers/nocifs.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { DatesService } from '../providers/dates.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-remarques',
  templateUrl: './remarques.component.html',
  styleUrls: ['./remarques.component.scss', '../../scss/headersShared.scss']
})

@Injectable({
  providedIn: 'root'
})


export class RemarquesComponent implements OnInit {

  incrementer;
  fireUser;
  docRef = this.db.collection('remarques').doc('actualRemarques');
  docCountDay = this.db.collection('counters').doc('remarquesDay');
  docCountMonth = this.db.collection('counters').doc('remarquesMonth');
  docCountYear = this.db.collection('counters').doc('remarquesYear');
  remarkDay;
  remarkMonth;
  remarkYear;


  constructor(public db: AngularFirestore, public nocifsService: NocifsService, public datesService: DatesService) {
    // Observable qui consomme le nocif service approprié et l'endroit à la vue
    this.nocifsService.getRemarques().subscribe(i => {
      this.incrementer = i.number;
    });

    this.nocifsService.getRemarkDay().subscribe(i => {
      this.remarkDay = i.remarkDay;
    });

    this.nocifsService.getRemarkMonth().subscribe(i => {
      this.remarkMonth = i.remarkMonth;
    });

    this.nocifsService.getRemarkYear().subscribe(i => {
      this.remarkYear = i.remarkYear;
    });
    this.fireUser = firebase.auth().currentUser;
  }

  ngOnInit() {
    this.counters();
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

  remarkClick() {
    const addOne = this.incrementer + 1;

    // Ajouter dans les data tracks
    this.db.collection('dataRemarques').add({
      number: addOne,
      id_user: this.fireUser.displayName,
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

  errorRemark() {
    let removeOne = this.incrementer - 1;
    if (removeOne < 0) {
      removeOne = 0;
    }
    const db = firebase.firestore();
    const docRef = db.collection('dataRemarques');
    docRef
      .where('number', '==', removeOne + 1)
      .limit(1)
      .get()
      .then(querySnap => {
      querySnap.forEach(e => {
        docRef.doc(e.id).delete().then();
        // update les compteurs visuellement
        this.counters();
      });
    });
    // Remove un au compteur général et met à jour la data principale
    this.docRef.set({
      number: removeOne,
      date: this.datesService.getDate(),
      dateLisible: this.datesService.dateLisible(),
      day: this.datesService.dayDate(),
      month: this.datesService.monthDate(),
      year: this.datesService.yearDate()
    });
  }
}

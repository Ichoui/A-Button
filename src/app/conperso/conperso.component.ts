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

  fireUser;
  user: User;

  incrementer;
  docRef = this.db.collection('users');
  docCount = this.db.collection('usersCounters');
  myConRemarkDay;
  myConRemarkMonth;
  myConRemarkYear;


  constructor(public db: AngularFirestore, public nocifsService: NocifsService, public datesService: DatesService, public auth: AuthService) {
    // défini le nom Google de l'utilisateur actif
    this.fireUser = firebase.auth().currentUser;

    // Observable qui consomme le nocif service approprié et l'envoie à la vue
    this.nocifsService.getMyConRemark().subscribe(i => {
      this.incrementer = i.number;
    });

    this.nocifsService.getMyConRemarkDay().subscribe(i => {
      this.myConRemarkDay = i.remarquesConDay;
    });

    this.nocifsService.getMyConRemarkMonth().subscribe(i => {
      this.myConRemarkMonth = i.remarquesConMonth;
    });

    this.nocifsService.getMyConRemarkYear().subscribe(i => {
      this.myConRemarkYear = i.remarquesConYear;
    });
  }

  ngOnInit() {
    this.counters();
    // this.auth.user$.subscribe(user => this.user = user);
  }

  counters() {
    this.datesService.daily('dataRemarquesCons', this.fireUser.displayName).then(async (data) => {
      this.docCount.doc('remarquesDay'+this.fireUser.displayName).set({
        remarquesConDay: data
      });
    });

    this.datesService.monthly('dataRemarquesCons', this.fireUser.displayName).then(async (data) => {
      this.docCount.doc('remarquesMonth'+this.fireUser.displayName).set({
        remarquesConMonth: data
      });
    });

    this.datesService.yearly('dataRemarquesCons', this.fireUser.displayName).then(async (data) => {
      this.docCount.doc('remarquesYear'+this.fireUser.displayName).set({
        remarquesConYear: data
      });
    });
  }

  conPersoClick() {
    let addOne = this.incrementer + 1;

    // Ajoute les data tracks de manière instanciée pour l'utilisateur connecté seulement
    this.db.collection('dataRemarquesCons').add({
      id_user: this.fireUser.displayName,
      number: addOne,
      date: this.datesService.getDate(),
      dateLisible: this.datesService.dateLisible(),
      day: this.datesService.dayDate(),
      month: this.datesService.monthDate(),
      year: this.datesService.yearDate()
    });

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
    // update here car sinon écrase ce qui a déjà été set lors de la création du compte avec google oAuth
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
        docRef.doc(e.id).delete().then();
    // update les compteurs visuellement
        this.counters();
      });
    });

    // Remove un au compteur général et met à jour la data principale
    // update here car sinon écrase ce qui a déjà été set lors de la création du compte avec google oAuth
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

import {Component, Injectable, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {NocifsService} from '../../providers/nocifs.service';
import {AuthService} from '../../user/providers/auth.service';

@Component({
  selector: 'app-avatarcon',
  templateUrl: './avatarcon.component.html',
  styleUrls: ['./avatarcon.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class AvatarconComponent implements OnInit {

  fireUser;
  user;
  db = firebase.firestore();
  docRef;
  hit = 0;
  heal = 0;

  date = new Date();
  resetHour = ['15', '52', '20']; // Hour : format 24 --- Minutes : 1 - 60
  maxHitBeforeDie = 50;
  isHeDie = false;


  constructor(public nocifService: NocifsService, public authService: AuthService) {
    this.authService.user$.subscribe(user => this.user = user);
    this.fireUser = firebase.auth().currentUser;
    this.docRef = this.db.collection('avatarCons').doc(this.fireUser.displayName);

    this.nocifService.getAvatar().subscribe(i => {
      this.hit = i.hitNumber;
      this.heal = i.healNumber;

      if (this.hit > this.maxHitBeforeDie - 1) {
        this.resetMyConToZeroBecauseHeIsDie();
        this.isHeDie = true;
      } else {
        this.isHeDie = false;
      }
    });
  }

  ngOnInit() {

  }

  hitMyCon() {
    const avatar = document.getElementById('avatar-con');
    avatar.classList.add('shake');
    setTimeout(function () {
      avatar.classList.remove('shake');
    }, 1000);
    this.incrementHits();
    this.bePwned();



  }

  healMyCon() {
    const heart1 = document.getElementById('heart-1');
    const heart2 = document.getElementById('heart-2');
    const heart3 = document.getElementById('heart-3');
    const heart4 = document.getElementById('heart-4');
    const heart5 = document.getElementById('heart-5');
    heart1.classList.add('slideOutDown');
    heart2.classList.add('slideOutLeft');
    heart3.classList.add('slideOutRight');
    heart4.classList.add('slideOutUp');
    heart5.classList.add('rotateIn');


    setTimeout(function () {
      heart1.classList.remove('slideOutDown');
      heart2.classList.remove('slideOutLeft');
      heart3.classList.remove('slideOutRight');
      heart4.classList.remove('slideOutUp');
      heart5.classList.remove('rotateIn');
    }, 1000);

    this.incrementHeal();
  }

  incrementHits() {
    this.hit += 1;
    return this.docRef.get().then(snapshotDocument => {
      if (snapshotDocument.exists) {
        return this.docRef.update({
          hitNumber: this.hit,
          deathDate: null
        });
      } else {
        return this.docRef.set({
          hitNumber: 1,
          healNumber: 0,
          deathDate: null
        });
      }
    });
  }

  incrementHeal() {
    this.heal += 1;

    return this.docRef.get().then(snapshotDocument => {
      if (snapshotDocument.exists) {
        return this.docRef.update({
          healNumber: this.heal,
          deathDate: null
        });
      } else {
        return this.docRef.set({
          hitNumber: 0,
          healNumber: 1,
          deathDate: null
        });
      }
    });
  }

  bePwned() {
    const avatar = document.getElementsByClassName('lecon');
// TODO : Evolution de l'avatar en fonction du nombre de hits (à définir)
    if ((this.hit - this.heal) >= 5) {
      // avatar.src = "/truc";
    }
    if (this.hit >= this.maxHitBeforeDie) {
      // On met l'avatar du mort
    }
  }

  resetMyConToZeroBecauseHeIsDie() {
    // TODO : Si il est mort, on joue avec un boolean qui passe  TRUE et qui empêche de sélectionner un nouveau con,
    // TODO : et on grise le HIT & HEAL, et on change la gueule de l'avatar

    this.docRef.update({
      hitNumber: 0,
      healNumber: 0,
      deathDate: this.date
    });


    // Ici : récupérer la date de mort et si à l'acutialisation, on est le - jour +1 à 00:00:00 -
    // ---> On permet à isHeDie de repasser à false et de ré-autoriser les clics

    this.docRef.get().then(e => {
      console.log(e.data().deathDate);
    });
  }
}

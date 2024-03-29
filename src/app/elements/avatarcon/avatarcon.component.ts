import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import * as firebase from 'firebase';
import { NocifsService } from '../../providers/nocifs.service';
import { AuthService } from '../../user/providers/auth.service';

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
  maxHitBeforeDie = 50;

  @Input() isHeDie = false;
  @Output() isHeDieEmit = new EventEmitter();

  constructor(public nocifService: NocifsService, public authService: AuthService) {
    this.authService.user$.subscribe(user => this.user = user);
    this.fireUser = firebase.auth().currentUser;
    this.docRef = this.db.collection('avatarCons').doc(this.fireUser.displayName);
    this.nocifService.getAvatar().subscribe(i => {
      this.hit = i.hitNumber;
      this.heal = i.healNumber;

      if (this.hit > this.maxHitBeforeDie - 1) {
        this.resetMyConToZeroBecauseHeIsDie();
      } else {
        this.isDateNotNull();
      }
    });

  }

  ngOnInit() {}

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

  // On remet les datas à zéro et on ajoute une date de décès
  resetMyConToZeroBecauseHeIsDie() {
    this.docRef.update({
      hitNumber: 0,
      healNumber: 0,
      deathDate: this.date
    });
  }

  // Si date de décès n'est pas nulle
  // On modifie l'affichage du con et annule la possibilité d'incrémenter
  // L'utilisateur doit attendre minuit pour que ce soit remis à zéro (avec refresh page)
  isDateNotNull() {
    this.docRef.get().then(e => {
      if (e.data().deathDate !== null) {
        const avatar = document.getElementById('avatar-con');
        const btnHit = document.getElementById('hitmycon');
        const btnHeal = document.getElementById('healmycon');
        // jour de la date de Décès --- la date du jour --- le nombre de hit
        const deathDate = e.data().deathDate.toDate();
        const deathhDay = deathDate.getDate();
        const actualDay = this.date.getDate();
        const hit = e.data().hitNumber;
        this.isHeDieEmit.emit(this.isHeDie = true);

        // L'utilisateur a tué son con. Disparition des boutons de hit/heal, modification de l'avatar
        // avatar.style.display = 'none';
        // btnHit.classList.add('unavailable');
        // btnHeal.classList.add('unavailable');

        if (actualDay > deathhDay && hit === 0) {
          // RESET du J+1 -> On met à jour en ré autorisant les boutons & remettant l'avatar de base
          this.isHeDieEmit.emit(this.isHeDie = false);
          // avatar.style.display = 'block';
          // btnHit.classList.remove('unavailable');
          // btnHeal.classList.remove('unavailable');
        }
      }
    });
  }
}

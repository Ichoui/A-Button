import {Component, Injectable, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {NocifsService} from '../../providers/nocifs.service';
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

  constructor(public nocifService: NocifsService, public authService: AuthService) {
    this.nocifService.getAvatar().subscribe(i => {
      this.hit = i.hitNumber;
      this.heal = i.healNumber;
    });
    this.authService.user$.subscribe(user => this.user = user);
    this.fireUser = firebase.auth().currentUser;
    this.docRef = this.db.collection('avatarCons').doc(this.fireUser.displayName);
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
    this.isHeDie();

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
          hitNumber: this.hit
        });
      } else {
        return this.docRef.set({
          hitNumber: 1,
          healNumber: 0
        });
      }
    });
  }

  incrementHeal() {
    this.heal += 1;

    return this.docRef.get().then(snapshotDocument => {
      if (snapshotDocument.exists) {
       return this.docRef.update({
          healNumber: this.heal
        });
      } else {
        return this.docRef.set({
          hitNumber: 0,
          healNumber: 1
        });
      }
    });
  }

  isHeDie() {
    const avatar = document.getElementsByClassName('lecon');

    if ((this.hit - this.heal) >= 5) {
      // avatar.src = "/truc";
    }
  }
}

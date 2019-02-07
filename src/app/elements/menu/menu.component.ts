import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../user/providers/auth.service';
import {NocifsService} from '../../providers/nocifs.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  fireUser;
  formConName: FormGroup;
  user;
  hit;
  heal;
  avatars;
  backgroudAvatar;


  constructor(public authService: AuthService, public nocifService: NocifsService, public router: Router, public db: AngularFirestore) {
    this.nocifService.getAvatar().subscribe(i => {
      this.hit = i.hitNumber;
      this.heal = i.healNumber;
    });
    this.formConName = new FormGroup({
      conName: new FormControl()
    });
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.backgroudAvatar = user.avatarCon;
    });
    this.fireUser = firebase.auth().currentUser;
  }

  ngOnInit() {
    this.avatarsExisting();
  }

  avatarsExisting() {
    this.avatars = ['lepen', 'macron', 'avatar_con', 'meluche'];
  }

  updateConName(data) {
    this.authService.updateConUser(this.fireUser, data).then();
  }

  onSubmit() {
    this.updateConName(this.formConName.value.conName);
  }

  extendMenu() {
    const menu = document.getElementById('menu');
    const arrow = document.getElementById('arrow');
    arrow.style.display = 'none';
    menu.classList.add('extend-menu');
  }

  closeMenu() {
    const menu = document.getElementById('menu');
    const arrow = document.getElementById('arrow');
    arrow.style.display = 'block';
    menu.classList.remove('extend-menu');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  chosingAvatar(e) {
    const fullPathImg = e.target.attributes[3].value;
    const correctImgWithExtension = fullPathImg.split('/');
    const correctImg = correctImgWithExtension[2].split('.')[0];
    const docRef = this.db.collection('users').doc(this.fireUser.displayName);
    docRef.update({
      avatarCon: correctImg
    });
    }
}

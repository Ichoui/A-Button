import {Component, OnInit} from '@angular/core';
import {AuthService} from '../user/providers/auth.service';
import {User} from '../user/providers/user';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {FormControl, FormGroup} from '@angular/forms';
import {ResetService} from '../providers/reset.service';
import { NocifsService } from '../providers/nocifs.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {

  // A PASSER EN FALSE QUAND ON DEV PLUS POUR MASQUER CONSOLE
  devMode: false;

  // Provient du component Switch
  switch: boolean = true;
  user: User;
  fireUser;
  formConName: FormGroup;
  hit;
  heal;


  constructor(public authService: AuthService, public router: Router, public reset: ResetService, public nocifService: NocifsService) {
    this.fireUser = firebase.auth().currentUser;
    this.nocifService.getAvatar().subscribe(i => {
      this.hit = i.hitNumber;
      this.heal = i.healNumber;
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => this.user = user);
    this.formConName = new FormGroup({
      conName: new FormControl()
    });

  }

  updateConName(data) {
    this.authService.updateConUser(this.fireUser, data);
  }

  onSubmit() {
    this.updateConName(this.formConName.value.conName);
  }


  emitter($event) {
    this.switch = $event;
    // console.log(this.switch);
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

  resetUsers() {
    this.reset.resetUsers();
  }

  resetConPerso() {
    this.reset.resetConsPerso();
  }

  resetRemarques() {
    this.reset.resetRemarques();
  }

  resetCons() {
    this.reset.resetCons();
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

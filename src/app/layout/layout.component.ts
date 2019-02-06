import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/providers/auth.service';
import { User } from '../user/providers/user';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { FormControl, FormGroup } from '@angular/forms';
import { ResetService } from '../providers/reset.service';
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


  constructor(public reset: ResetService) {
    this.fireUser = firebase.auth().currentUser;
  }

  ngOnInit() {
  }

  emitter($event) {
    this.switch = $event;
    // console.log(this.switch);
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


}

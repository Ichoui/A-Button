import {Component, OnInit} from '@angular/core';
import {AuthService} from '../user/providers/auth.service';
import {User} from '../user/providers/user';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {

  // Provient du component Switch
  switch: boolean = true;
  user: User;
  fireUser;


  constructor(public authService: AuthService, public router: Router) {
    this.fireUser = firebase.auth().currentUser;
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => this.user = user);
    // console.log(this.switch);
    const data = 'filsdecon';
    this.updateConName(data);
  }

  updateConName(data) {
    this.authService.updateConUser(this.fireUser, data)
  }


  emitter($event) {
    this.switch = $event;
    // console.log(this.switch);
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../user/providers/auth.service';
import {User} from '../user/providers/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {

  // Provient du component Switch
  switch: boolean = true;
  user: User;


   constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => this.user = user);
    // console.log(this.switch);
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

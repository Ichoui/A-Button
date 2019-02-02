import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { User } from '../providers/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  user: User;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => this.user = user);
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../user/providers/user';
import {AuthService} from '../../user/providers/auth.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input() switch: boolean = true;
  @Output() switchEmitter = new EventEmitter();
  user: User;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => this.user = user);
  }

  theSwitcher() {
    this.switchEmitter.emit(this.switch = this.switch !== true);
  }

}

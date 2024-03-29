import {Component, Input, OnInit} from '@angular/core';
import {ConpersoComponent} from '../../conperso/conperso.component';
import {ConsComponent} from '../../cons/cons.component';
import {RemarquesComponent} from '../../remarques/remarques.component';
import {AvatarconComponent} from '../avatarcon/avatarcon.component';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  constructor(
    public conPerso: ConpersoComponent,
    public con: ConsComponent,
    public remarques: RemarquesComponent,
    public avatarCon: AvatarconComponent
  ) {
  }

  @Input() switch;
  @Input() isHeDie;

  ngOnInit() {
  }


  // CON PERSO
  conPersoClick() {
    this.conPerso.conPersoClick();
  }

  errorConPersoClick() {
    this.conPerso.errorConPersoClick();
  }

  // REMARQUES
  remarqueClick() {
    this.remarques.remarkClick();
  }

  errorRemarqueClick() {
    this.remarques.errorRemark();
  }

  // CON
  conClick() {
    this.con.conClick();
  }

  errorConClick() {
    this.con.errorCons();
  }

  // AVATAR CON
  hitMyCon() {
    this.avatarCon.hitMyCon();
  }

  healMyCon() {
    this.avatarCon.healMyCon();
  }
}

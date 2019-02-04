import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input() switch: boolean = true;
  @Output() switchEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  theSwitcher() {
    this.switchEmitter.emit(this.switch = this.switch !== true);
    // console.log(this.switch)
  }

}

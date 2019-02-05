import {Component, Injectable, OnInit} from '@angular/core';

@Component({
  selector: 'app-avatarcon',
  templateUrl: './avatarcon.component.html',
  styleUrls: ['./avatarcon.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class AvatarconComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  hitMyCon() {
    console.log("Je te frappe connard")
  }

  healMyCon() {
    console.log("Besoin de soins ?")
  }

}

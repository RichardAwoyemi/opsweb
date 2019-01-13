import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: any;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}

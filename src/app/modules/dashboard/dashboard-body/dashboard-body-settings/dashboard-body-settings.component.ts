import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-body-settings',
  templateUrl: './dashboard-body-settings.component.html'
})
export class DashboardBodySettingsComponent implements OnInit {
  innerHeight: number;

  constructor() {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }
}

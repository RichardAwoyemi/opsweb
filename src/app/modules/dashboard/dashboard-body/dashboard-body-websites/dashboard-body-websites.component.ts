import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-body-websites',
  templateUrl: './dashboard-body-websites.component.html'
})
export class DashboardBodyWebsitesComponent implements OnInit {
  innerHeight: number;

  constructor() {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }
}

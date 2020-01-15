import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-body-templates',
  templateUrl: './dashboard-body-templates.component.html'
})
export class DashboardBodyTemplatesComponent implements OnInit {
  innerHeight: number;

  constructor() {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }
}

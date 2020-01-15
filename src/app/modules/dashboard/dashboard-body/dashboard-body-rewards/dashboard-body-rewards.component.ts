import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-body-rewards',
  templateUrl: './dashboard-body-rewards.component.html'
})
export class DashboardBodyRewardsComponent implements OnInit {
  innerHeight: number;

  constructor() {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }
}

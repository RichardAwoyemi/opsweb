import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-body-rewards',
  templateUrl: './dashboard-body-rewards.component.html',
  styleUrls: ['./dashboard-body-rewards.component.css']
})
export class DashboardBodyRewardsComponent implements OnInit {
  innerHeight: number;

  constructor() {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }

  copyMessage() {

  }
}

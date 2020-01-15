import { Component, HostListener, OnInit } from '@angular/core';
import { debounce } from '../../../shared/decorators/debounce.decorator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html'
})
export class DashboardSidebarComponent implements OnInit {
  innerHeight: number;

  constructor(
    public router: Router
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }

  redirectToBuilder() {
    this.router.navigate(['builder']).then(() => {
    });
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.innerHeight = window.innerHeight;
  }
}

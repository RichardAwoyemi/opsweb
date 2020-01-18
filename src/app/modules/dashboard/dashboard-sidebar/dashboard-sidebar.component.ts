import { Component, HostListener, OnInit } from '@angular/core';
import { debounce } from '../../../shared/decorators/debounce.decorator';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html'
})
export class DashboardSidebarComponent implements OnInit {
  innerHeight: number;

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.innerHeight = window.innerHeight;
  }
}

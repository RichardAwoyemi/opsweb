import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-footer',
  templateUrl: './dashboard-footer.component.html'
})
export class DashboardFooterComponent {
  today: number = Date.now();

  constructor(
    public authService: AuthService
  ) { }
}

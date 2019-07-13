import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/pages/dashboard/dashboard.page';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule implements OnInit {
  constructor() { }

  ngOnInit() {
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
  }
}

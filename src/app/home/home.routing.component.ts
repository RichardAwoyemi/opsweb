import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.page';
import { LegalComponent } from './pages/legal/legal.page';
import { PressComponent } from './pages/press/press.page';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'press', component: PressComponent },
  { path: 'legal', component: LegalComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule implements OnInit {
  constructor() { }

  ngOnInit() {
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
  }
}

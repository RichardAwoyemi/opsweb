import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.page';
import { PressComponent } from './pages/press/press.page';
import { LegalComponent } from './pages/legal/legal.page';
import { AnonymousGuard } from '../common/guards/anonymous.guard';
import { ContactComponent } from './pages/contact/contact.page';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AnonymousGuard] },
  { path: 'press', component: PressComponent, canActivate: [AnonymousGuard] },
  { path: 'legal', component: LegalComponent, canActivate: [AnonymousGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AnonymousGuard] },
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

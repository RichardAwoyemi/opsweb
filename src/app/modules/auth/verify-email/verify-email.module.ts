import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from 'src/app/modules/core/guards/anonymous.guard';
import { AuthService } from '../auth.service';
import { VerifyEmailComponent } from './verify-email.page';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: VerifyEmailComponent, canActivate: [AnonymousGuard] },
];

@NgModule({
  declarations: [
    VerifyEmailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [
    AuthService
  ]
})

export class VerifyEmailModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from 'src/app/modules/core/guards/anonymous.guard';
import { RegisterComponent } from './register.page';
import { AuthService } from '../auth.service';
import { SectionHeaderGroupModule } from 'src/app/shared/components/section-header-group/section-header-group.module';
import { FormRegisterModule } from 'src/app/shared/components/form-register/form-register.module';

const routes: Routes = [
  { path: '', component: RegisterComponent, canActivate: [AnonymousGuard] },
];

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SectionHeaderGroupModule,
    FormRegisterModule
  ],
  providers: [
    AuthService
  ]
})

export class RegisterModule {
}

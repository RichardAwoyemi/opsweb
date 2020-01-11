import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from 'src/app/modules/core/guards/anonymous.guard';
import { AuthService } from '../auth.service';
import { TestComponent } from './test.page';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { SectionHeaderGroupModule } from 'src/app/shared/components/section-header-group/section-header-group.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: TestComponent }
];

@NgModule({
  declarations: [
    TestComponent,
    PaymentFormComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SectionHeaderGroupModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    AuthService
  ]
})

export class TestModule {
}

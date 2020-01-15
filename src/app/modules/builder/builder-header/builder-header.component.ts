import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderCreateAccountModalComponent } from '../builder-actions/builder-create-account-modal/builder-create-account-modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-builder-header',
  templateUrl: './builder-header.component.html',
  styleUrls: ['./builder-header.component.css']
})
export class BuilderHeaderComponent {
  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    public router: Router
  ) {
  }

  openCreateAccountModal() {
    this.modalService.open(BuilderCreateAccountModalComponent, { windowClass: 'modal-holder', centered: true });
  }

  signOut() {
    this.authService.signOut();
  }

  redirectToDashboard() {
    this.router.navigate(['dashboard']).then(() => {
    });
  }
}

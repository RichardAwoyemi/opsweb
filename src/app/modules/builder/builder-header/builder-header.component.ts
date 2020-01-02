import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderCreateAccountModalComponent } from '../builder-actions/builder-create-account-modal/builder-create-account-modal.component';

@Component({
  selector: 'app-builder-header',
  templateUrl: './builder-header.component.html',
  styleUrls: ['./builder-header.component.css']
})
export class BuilderHeaderComponent {
  constructor(
    private modalService: NgbModal
  ) {
  }

  openCreateAccountModal() {
    this.modalService.open(BuilderCreateAccountModalComponent, { windowClass: 'modal-holder', centered: true });
  }

  logout() {
  }
}

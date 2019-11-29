import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { Subscription } from 'rxjs';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-builder-delete-page-modal',
  templateUrl: './builder-delete-page-modal.component.html'
})
export class BuilderDeletePageModalComponent implements IModalComponent {
  @Input() activePage;
  @Input() activePageIndex;
  navbarMenuOptions: any;
  private navbarMenuOptionsSubscription: Subscription;

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private builderNavbarService: BuilderNavbarService
  ) {
  }

  ngOnInit() {
    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    });
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    this.navbarMenuOptions.splice(this.activePageIndex, 1);
    this.builderNavbarService.navbarMenuOptions.next(this.navbarMenuOptions);
    this.toastrService.success('Your page has been deleted.', 'Great!');
  }
}

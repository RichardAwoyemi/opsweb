import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { Subscription } from 'rxjs';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { ToastrService } from 'ngx-toastr';
import { BuilderService } from '../../builder.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { ActiveComponentsPartialSelector } from '../../builder';
import { BuilderFooterService } from '../../builder-components/builder-footer/builder-footer.service';

@Component({
  selector: 'app-builder-delete-page-modal',
  templateUrl: './builder-delete-page-modal.component.html'
})
export class BuilderDeletePageModalComponent implements IModalComponent, OnInit, OnDestroy {
  @Input() activePage;
  @Input() activePageIndex;
  navbarMenuOptions: any;
  footerMenuOptions: any;
  pageComponents: any;
  private navbarMenuOptionsSubscription: Subscription;
  private footerMenuOptionsSubscription: Subscription;
  private pageComponentsSubscription: Subscription;

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService,
    private builderNavbarService: BuilderNavbarService,
    private builderFooterService: BuilderFooterService
  ) {
  }

  ngOnInit() {
    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    });

    this.footerMenuOptionsSubscription = this.builderFooterService.footerMenuOptions.subscribe(response => {
      if (response) {
        this.footerMenuOptions = response;
      }
    });

    this.pageComponentsSubscription = this.builderComponentsService.pageComponents.subscribe((response => {
      if (response) {
        this.pageComponents = response;
      }
    }));
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    this.builderComponentsService.deletePage(this.activePage);
    this.builderNavbarService.deleteNavbarMenuOption(this.activePageIndex);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarMenuOptions', this.builderNavbarService.navbarMenuOptions.getValue());
    this.builderFooterService.deleteFooterMenuOption(this.activePageIndex);
    this.builderService.activePageSetting.next('Home');
    this.toastrService.success('Your page has been deleted.', 'Great!');
  }

  ngOnDestroy() {
    this.navbarMenuOptionsSubscription.unsubscribe();
    this.pageComponentsSubscription.unsubscribe();
    this.footerMenuOptionsSubscription.unsubscribe();
  }
}

import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { Subscription } from 'rxjs';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { ToastrService } from 'ngx-toastr';
import { BuilderService } from '../../builder.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';

@Component({
  selector: 'app-builder-delete-page-modal',
  templateUrl: './builder-delete-page-modal.component.html'
})
export class BuilderDeletePageModalComponent implements IModalComponent {
  @Input() activePage;
  @Input() activePageIndex;
  navbarMenuOptions: any;
  pageComponents: any;
  private navbarMenuOptionsSubscription: Subscription;
  private pageComponentsSubscription: Subscription;

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private builderService: BuilderService,
    private builderComponentService: BuilderComponentsService,
    private builderNavbarService: BuilderNavbarService
  ) {
  }

  ngOnInit() {
    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    });

    this.pageComponentsSubscription = this.builderComponentService.pageComponents.subscribe((response => {
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

    for (let i = 0; i < this.pageComponents['pages'].length; i++) {
      if (this.pageComponents['pages'][i]['name'] == this.activePage) {
        this.pageComponents['pages'].splice(i, 1);
      }
    }
    this.builderComponentService.pageComponents.next(this.pageComponents);

    this.navbarMenuOptions.splice(this.activePageIndex, 1);
    this.builderNavbarService.navbarMenuOptions.next(this.navbarMenuOptions);

    this.builderService.activePageSetting.next('Home');

    this.toastrService.success('Your page has been deleted.', 'Great!');
  }

  ngOnDestroy() {
    this.navbarMenuOptionsSubscription.unsubscribe();
    this.pageComponentsSubscription.unsubscribe();
  }
}

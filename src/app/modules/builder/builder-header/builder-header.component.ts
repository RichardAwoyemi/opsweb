import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderCreateAccountModalComponent } from '../builder-actions/builder-create-account-modal/builder-create-account-modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { BuilderService } from '../builder.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IUser } from '../../../shared/models/user';
import * as fromUser from '../../core/store/user/user.reducer';
import { BuilderRenameWebsiteModalComponent } from '../builder-actions/builder-rename-website-modal/builder-rename-website-modal.component';
import { WebsiteService } from '../../../shared/services/website.service';
import { BuilderActionsService } from '../builder-actions/builder-actions.service';
import { SimpleModalService } from '../../../shared/components/simple-modal/simple-modal.service';

@Component({
  selector: 'app-builder-header',
  templateUrl: './builder-header.component.html',
  styleUrls: ['./builder-header.component.css']
})
export class BuilderHeaderComponent implements OnInit, OnDestroy {
  websiteName: string;
  websiteLoaded = false;
  photoURL = '/assets/img/anonymous.jpg';
  user: IUser;
  modalStatus = false;

  websiteNameSubscription: Subscription;
  websiteLoadedSubscription: Subscription;
  modalStatusSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private builderService: BuilderService,
    private builderActionsService: BuilderActionsService,
    private websiteService: WebsiteService,
    private simpleModalService: SimpleModalService,
    private userStore: Store<fromUser.State>,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
        }
      });

    this.websiteNameSubscription = this.websiteService.websiteName.subscribe((response => {
      if (response) {
        this.websiteName = response;
      }
    }));

    this.websiteLoadedSubscription = this.websiteService.websiteLoaded.subscribe((response => {
      if (response) {
        this.websiteLoaded = response;
      }
    }));

    this.modalStatusSubscription = this.builderActionsService.renameRenameWebsiteModalStatus.subscribe((response => {
      if (response) {
        this.modalStatus = response['open'];
      }
    }));
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  openCreateAccountModal() {
    this.modalService.open(BuilderCreateAccountModalComponent, {windowClass: 'modal-holder', centered: true});
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['home']).then(() => {
    });
  }

  redirectToDashboard() {
    this.router.navigate(['dashboard']).then(() => {
    });
  }

  removeLineBreaks(event: any) {
    event.preventDefault();
    event.stopPropagation();
    BuilderService.removeLineBreaks(event);
  }

  openRenameWebsiteModal(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.websiteName !== event.target.innerHTML && !this.modalStatus) {
      this.builderActionsService.renameRenameWebsiteModalStatus.next({'open': true});
      const modal = this.modalService.open(BuilderRenameWebsiteModalComponent, {
        windowClass: 'modal-holder',
        centered: true
      });
      modal.componentInstance.websiteName = this.websiteName.toLowerCase();
      modal.componentInstance.newWebsiteName = event.target.innerText.toLowerCase();
    }
  }

  redirect() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']).then(() => {
      });
    } else {
      this.router.navigate(['home']).then(() => {
      });
    }
  }

  openPublishModal() {
    if (!this.authService.isLoggedIn()) {
      this.modalService.open(BuilderCreateAccountModalComponent, {windowClass: 'modal-holder', centered: true});
    }
  }

  ngOnDestroy(): void {
    this.websiteNameSubscription.unsubscribe();
    this.websiteLoadedSubscription.unsubscribe();
    this.modalStatusSubscription.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SimpleModalService } from '../../../shared/components/simple-modal/simple-modal.service';
import { IUser } from '../../../shared/models/user';
import { WebsiteService } from '../../../shared/services/website.service';
import { AuthService } from '../../auth/auth.service';
import * as fromUser from '../../core/store/user/user.reducer';
import { BuilderActionsService } from '../builder-actions/builder-actions.service';
import { BuilderCreateAccountModalComponent } from '../builder-actions/builder-create-account-modal/builder-create-account-modal.component';
import { BuilderPublishWebsiteModalComponent } from '../builder-actions/builder-publish-website-modal/builder-publish-website-modal.component';
import { BuilderRenameWebsiteModalComponent } from '../builder-actions/builder-rename-website-modal/builder-rename-website-modal.component';
import { BuilderService } from '../builder.service';

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
  ngUnsubscribe = new Subject<void>();

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
      .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
        }
      });

    this.websiteService.websiteName.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((response => {
      if (response) {
        this.websiteName = response;
      }
    }));

    this.websiteService.websiteLoaded.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((response => {
      if (response) {
        this.websiteLoaded = response;
      }
    }));

    this.builderActionsService.renameRenameWebsiteModalStatus.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((response => {
      if (response) {
        this.modalStatus = response['open'];
      }
    }));
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  openCreateAccountModal() {
    this.modalService.open(BuilderCreateAccountModalComponent, { windowClass: 'modal-holder', centered: true });
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
      this.builderActionsService.renameRenameWebsiteModalStatus.next({ 'open': true });
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
      this.modalService.open(BuilderCreateAccountModalComponent, { windowClass: 'modal-holder', centered: true });
    } else {
      this.modalService.open(BuilderPublishWebsiteModalComponent, { windowClass: 'modal-holder', centered: true });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

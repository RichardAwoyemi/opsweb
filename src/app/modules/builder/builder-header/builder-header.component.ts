import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-builder-header',
  templateUrl: './builder-header.component.html',
  styleUrls: ['./builder-header.component.css']
})
export class BuilderHeaderComponent implements OnInit {
  websiteName: string;
  websiteNameSubscription: Subscription;
  photoURL = '/assets/img/anonymous.jpg';
  user: IUser;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private builderService: BuilderService,
    private websiteService: WebsiteService,
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
    BuilderService.removeLineBreaks(event);
  }

  saveWebsiteName(event: any) {
    if (this.websiteName !== event.target.innerHTML) {
      const modal = this.modalService.open(BuilderRenameWebsiteModalComponent, {
        windowClass: 'modal-holder',
        centered: true
      });
      modal.componentInstance.websiteName = this.websiteName;
      modal.componentInstance.newWebsiteName = event.target.innerHTML;
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
}

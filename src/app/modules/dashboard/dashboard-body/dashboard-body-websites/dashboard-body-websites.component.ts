import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardCreateWebsiteModalComponent } from '../../dashboard-actions/dashboard-create-website-modal/dashboard-create-website-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { WebsiteService } from '../../../../shared/services/website.service';
import { IUser } from '../../../../shared/models/user';
import { Store } from '@ngrx/store';
import * as fromUser from '../../../core/store/user/user.reducer';
import { Router } from '@angular/router';
import { DashboardDeleteWebsiteModalComponent } from '../../dashboard-actions/dashboard-delete-website-modal/dashboard-delete-website-modal.component';
import { DashboardRenameWebsiteModalComponent } from '../../dashboard-actions/dashboard-rename-website-modal/dashboard-rename-website.modal.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dashboard-body-websites',
  templateUrl: './dashboard-body-websites.component.html',
  styleUrls: ['./dashboard-body-websites.component.css']
})
export class DashboardBodyWebsitesComponent implements OnInit, OnDestroy {
  innerHeight: number;
  websites: any;
  user: any;

  private websitesSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private websiteService: WebsiteService,
    private ngxLoader: NgxUiLoaderService,
    private userStore: Store<fromUser.State>
  ) {
  }

  ngOnInit() {
    this.ngxLoader.start();
    this.innerHeight = window.innerHeight;
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
          this.websitesSubscription = this.websiteService.getWebsitesByUserId(this.user['uid']).subscribe(response => {
            if (response) {
              this.websites = response;
            }
          });
        }
      });
    this.ngxLoader.stop();
  }

  openCreateWebsiteModal() {
    this.modalService.open(DashboardCreateWebsiteModalComponent, {windowClass: 'modal-holder', centered: true});
  }

  openBuilderPage(uid: string) {
    this.router.navigate(['builder/' + uid]).then(() => {
    });
  }

  openDeleteWebsiteModal(uid: string, name: string) {
    const modal = this.modalService.open(DashboardDeleteWebsiteModalComponent, {
      windowClass: 'modal-holder',
      centered: true
    });
    modal.componentInstance.websiteId = uid;
    modal.componentInstance.websiteName = name;
  }

  openRenameWebsiteModal(uid: string, name: string) {
    const modal = this.modalService.open(DashboardRenameWebsiteModalComponent, {
      windowClass: 'modal-holder',
      centered: true
    });
    modal.componentInstance.websiteId = uid;
    modal.componentInstance.websiteName = name;
  }

  ngOnDestroy() {
    if (this.websitesSubscription) {
      this.websitesSubscription.unsubscribe();
    }
  }
}

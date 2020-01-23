import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderCreateAccountModalComponent } from '../builder-actions/builder-create-account-modal/builder-create-account-modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { BuilderService } from '../builder.service';
import { Subscription } from 'rxjs';
import { BuilderRenameWebsiteModalComponent } from '../builder-actions/builder-rename-website-modal/builder-rename-website-modal.component';

@Component({
  selector: 'app-builder-header',
  templateUrl: './builder-header.component.html',
  styleUrls: ['./builder-header.component.css']
})
export class BuilderHeaderComponent implements OnInit {
  websiteName: string;
  websiteNameSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private builderService: BuilderService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.websiteNameSubscription = this.builderService.websiteName.subscribe((response => {
      if (response) {
        this.websiteName = response;
      }
    }));
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

  removeLineBreaks(event: any) {
    BuilderService.removeLineBreaks(event);
  }

  saveWebsiteName(event: any) {
    if (this.websiteName != event.target.innerHTML) {
      const modal = this.modalService.open(BuilderRenameWebsiteModalComponent, { windowClass: 'modal-holder', centered: true });
      modal.componentInstance.websiteName = this.websiteName;
      modal.componentInstance.newWebsiteName = event.target.innerHTML;
    }
  }
}

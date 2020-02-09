import { Component, OnInit } from '@angular/core';
import { DashboardCreateWebsiteModalComponent } from '../../dashboard-actions/dashboard-create-website-modal/dashboard-create-website-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-body-websites',
  templateUrl: './dashboard-body-websites.component.html'
})
export class DashboardBodyWebsitesComponent implements OnInit {
  innerHeight: number;
  websites: any;

  constructor(
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }

  openCreateWebsiteModal() {
    this.modalService.open(DashboardCreateWebsiteModalComponent, { windowClass: 'modal-holder', centered: true });
  }
}

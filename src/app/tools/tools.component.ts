import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { ModalComponent } from '../_modals/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $;

@Component({
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  isMobile: Observable<BreakpointState>;

  @ViewChild('showDetailsModal') showDetailsModal: ElementRef;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public modalService: NgbModal
  ) { }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);
  }

  createNewAddress() {
    const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
    modalReference.componentInstance.header = 'Oops!';
    modalReference.componentInstance.message = 'This feature is currently under construction. ' +
    'For the time being, you are only allowed a single address.';
  }

  showDetails() {
    $(this.showDetailsModal.nativeElement).modal('show');
  }
}

import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { ModalService } from '../../../common/services/modal.service';

@Component({
  templateUrl: './contact.page.html'
})
export class ContactComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  submitted = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public modalService: ModalService,
  ) { }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);
  }
}

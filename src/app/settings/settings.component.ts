import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment.staging';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

declare var $;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: any;
  campaignMode: boolean;
  anonymousPhotoURL: string;
  isMobile: Observable<BreakpointState>;

  @ViewChild('showVerifyIdentityModal') showVerifyIdentityModal: ElementRef;
  @ViewChild('showVerifyDocumentationModal') showVerifyDocumentationModal: ElementRef;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.campaignMode = environment.campaignMode;
    this.anonymousPhotoURL = 'https://i.imgflip.com/1slnr0.jpg';
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset ]);
  }

  showVerifyIdentity() {
    $(this.showVerifyIdentityModal.nativeElement).modal('show');
  }

  showVerifyDocumentation() {
    $(this.showVerifyDocumentationModal.nativeElement).modal('show');
  }
}

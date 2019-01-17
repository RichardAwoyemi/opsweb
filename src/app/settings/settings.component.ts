import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var $;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: any;

  @ViewChild('showVerifyIdentityModal') showVerifyIdentityModal: ElementRef;
  @ViewChild('showVerifyDocumentationModal') showVerifyDocumentationModal: ElementRef;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  showVerifyIdentity() {
    $(this.showVerifyIdentityModal.nativeElement).modal('show');
  }

  showVerifyDocumentation() {
    $(this.showVerifyDocumentationModal.nativeElement).modal('show');
  }
}

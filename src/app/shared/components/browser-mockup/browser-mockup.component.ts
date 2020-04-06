import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { WebsiteService } from '../../services/website.service';
import { IUser } from '../../models/user';
import { Template } from '../../models/template';

@Component({
  selector: 'app-browser-mockup',
  templateUrl: './browser-mockup.component.html',
  styleUrls: ['./browser-mockup.component.css']
})
export class BrowserMockupComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  @Input() img: string;
  @Input() view: string;
  @Input() template: Template;
  @Input() user: IUser;
  imageStyle: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private websiteService: WebsiteService
  ) {
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
  }

  setImageOpacity(opacity) {
    this.imageStyle = { 'opacity': opacity };
  }

  createWebsite() {
    this.websiteService.createWebsiteFromTemplate(this.template, this.user);
  }
}

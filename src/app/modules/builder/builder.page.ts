import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BuilderService } from './builder.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.page.html'
})
export class BuilderComponent implements OnInit {
  previewMode: boolean = false;
  sidebarClass: string = 'col-md-3';
  showcaseClass: string = 'col-md-9';
  private previewModeSubscription: Subscription;

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.ngxLoader.start();
    this.previewModeSubscription = this.builderService.previewMode.subscribe((response => {
      if (response) {
        this.previewMode = response;
        this.showcaseClass = 'col-md-12';
      } else {
        this.previewMode = false;
        this.showcaseClass = 'col-md-9';
      }
    }));
    this.ngxLoader.stop();
  }
}

import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { debounce } from '../../../shared/decorators/debounce.decorator';
import { BuilderService } from '../builder.service';
import { ActiveSettings } from '../builder';


@Component({
  selector: 'app-builder-sidebar',
  templateUrl: './builder-sidebar.component.html',
  styleUrls: ['./builder-sidebar.component.css']
})
export class BuilderSidebarComponent implements OnInit, OnDestroy {
  innerHeight: number;
  activeEditSetting: string;
  activeTab = 'tab-pane fade active show tab-padding';
  inactiveTab = 'tab-pane fade tab-padding';
  componentSettingsTab = [ActiveSettings.Colours, ActiveSettings.Layout, ActiveSettings.Options];
  templatesTab = [ActiveSettings.Templates];
  componentsTab = [ActiveSettings.Components];
  pagesTab = [ActiveSettings.Pages];

  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.builderService.activeEditSetting.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.activeEditSetting = response;
      });
  }

  setTabClass(tab) {
    return (tab.includes(this.activeEditSetting)) ? this.activeTab : this.inactiveTab;
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.innerHeight = window.innerHeight;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveSidebarSettings } from './dashboard';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@Injectable()
export class DashboardService {
  constructor(
    private scrollToService: ScrollToService
  ) {
  }

  activeSidebarSetting = new BehaviorSubject<string>(ActiveSidebarSettings.Websites);

  triggerScrollTo(elementId: string) {
    const config: ScrollToConfigOptions = {
      target: elementId
    };
    this.scrollToService.scrollTo(config);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateService } from '../../../../../shared/services/template.service';
import { WebsiteService } from '../../../../../shared/services/website.service';
import { ActiveComponents, ActiveComponentsPartialSelector, ActiveTemplates, ActiveThemes } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';

@Component({
  selector: 'app-navbar-colour-picker',
  templateUrl: './navbar-colour-picker.component.html'
})
export class NavbarColourPickerComponent implements OnInit, OnDestroy {
  navbarThemes: any;
  navbarStyle: any = {
    'background-color': '#FFFFFF'
  };
  navbarBrandStyle: any = {
    'color': '#757575'
  };
  navbarLinkStyle: any = {
    'color': '#000'
  };
  navbarTemplate: string = ActiveTemplates.Default;
  navbarTheme: string = ActiveThemes.Default;
  defaultNavbarStyle: any;
  websiteChangeCount: number;
  pageComponents: any;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private templateService: TemplateService,
    private builderNavbarService: BuilderNavbarService,
    private builderComponentsService: BuilderComponentsService,
    private websiteService: WebsiteService
  ) {
  }

  ngOnInit() {
    this.builderNavbarService.navbarStyle.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.navbarStyle = response;
      }
    });

    this.builderNavbarService.navbarBrandStyle.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.navbarBrandStyle = response;
      }
    });

    this.builderNavbarService.navbarLinkStyle.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.navbarLinkStyle = response;
      }
    });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(templateResponse => {
      if (templateResponse) {
        this.navbarTemplate = templateResponse['template'];

        this.templateService.getTemplateStyle(this.navbarTemplate).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
          if (response) {
            this.defaultNavbarStyle = response[ActiveComponents.Navbar];
          }
        });
      }
    });

    this.builderNavbarService.navbarTheme.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.navbarTheme = response;
      }
    });

    this.builderNavbarService.getNavbarThemes().pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.navbarThemes = response;
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.pageComponents = response;
      }
    });
  }

  onThemeChange() {
    if (this.navbarTheme === ActiveThemes.Default) {
      this.resetToDefault();
    } else {
      this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarTheme', this.navbarTheme);
      this.builderNavbarService.setNavbarTheme(this.navbarTheme);
      this.builderNavbarService.navbarTheme.next(this.navbarTheme);
    }
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setNavbarStyle() {
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarStyle', this.navbarStyle);
    this.builderNavbarService.navbarStyle.next(this.navbarStyle);
  }

  setNavbarBrandStyle() {
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', this.navbarBrandStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  setNavbarLinkStyle() {
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLinkStyle', this.navbarLinkStyle);
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  resetToDefault() {
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarTheme', ActiveThemes.Default);
    this.builderNavbarService.navbarTheme.next(ActiveThemes.Default);

    this.navbarStyle['background-color'] = this.defaultNavbarStyle['style']['navbarStyle']['background-color'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarStyle', this.navbarStyle);
    this.builderNavbarService.navbarStyle.next(this.navbarStyle);

    this.navbarBrandStyle['color'] = this.defaultNavbarStyle['style']['navbarBrandStyle']['color'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', this.navbarBrandStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);

    this.navbarLinkStyle['color'] = this.defaultNavbarStyle['style']['navbarLinkStyle']['color'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLinkStyle', this.navbarLinkStyle);
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

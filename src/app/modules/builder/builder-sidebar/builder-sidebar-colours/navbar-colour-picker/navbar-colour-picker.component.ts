import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { ActiveComponents, ActiveComponentsPartialSelector, ActiveTemplates, ActiveThemes } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { WebsiteService } from '../../../../../shared/services/website.service';
import { TemplateService } from '../../../../../shared/services/template.service';

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

  private navbarStyleSubscription: Subscription;
  private navbarBrandStyleSubscription: Subscription;
  private navbarLinkStyleSubscription: Subscription;
  private navbarTemplateSubscription: Subscription;
  private navbarThemeSubscription: Subscription;
  private navbarThemesSubscription: Subscription;
  private defaultNavbarStyleSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;
  private builderComponentsSubscription: Subscription;

  constructor(
    private templateService: TemplateService,
    private builderNavbarService: BuilderNavbarService,
    private builderComponentsService: BuilderComponentsService,
    private websiteService: WebsiteService
  ) {
  }

  ngOnInit() {
    this.navbarStyleSubscription = this.builderNavbarService.navbarStyle.subscribe(response => {
      if (response) {
        this.navbarStyle = response;
      }
    });

    this.navbarBrandStyleSubscription = this.builderNavbarService.navbarBrandStyle.subscribe(response => {
      if (response) {
        this.navbarBrandStyle = response;
      }
    });

    this.navbarLinkStyleSubscription = this.builderNavbarService.navbarLinkStyle.subscribe(response => {
      if (response) {
        this.navbarLinkStyle = response;
      }
    });

    this.navbarTemplateSubscription = this.builderComponentsService.pageComponents.subscribe(templateResponse => {
      if (templateResponse) {
        this.navbarTemplate = templateResponse['template'];

        this.defaultNavbarStyleSubscription = this.templateService.getTemplateStyle(this.navbarTemplate).subscribe(response => {
          if (response) {
            this.defaultNavbarStyle = response[ActiveComponents.Navbar];
          }
        });
      }
    });

    this.navbarThemeSubscription = this.builderNavbarService.navbarTheme.subscribe(response => {
      if (response) {
        this.navbarTheme = response;
      }
    });

    this.navbarThemesSubscription = this.builderNavbarService.getNavbarThemes().subscribe(response => {
      if (response) {
        this.navbarThemes = response;
      }
    });

    this.websiteChangeCountSubscription = this.websiteService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });

    this.builderComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
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

  ngOnDestroy() {
    this.navbarStyleSubscription.unsubscribe();
    this.navbarBrandStyleSubscription.unsubscribe();
    this.navbarLinkStyleSubscription.unsubscribe();
    this.navbarTemplateSubscription.unsubscribe();
    this.navbarThemeSubscription.unsubscribe();
    this.navbarThemesSubscription.unsubscribe();
    this.defaultNavbarStyleSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
    this.builderComponentsSubscription.unsubscribe();
  }
}

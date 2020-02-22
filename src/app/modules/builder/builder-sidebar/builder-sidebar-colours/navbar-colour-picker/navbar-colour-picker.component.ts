import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { ActiveComponentsPartialSelector, ActiveTemplates, ActiveThemes } from '../../../builder';
import { BuilderService } from '../../../builder.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';

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
    private builderNavbarService: BuilderNavbarService,
    private builderComponentService: BuilderComponentsService,
    private builderService: BuilderService
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

    this.navbarTemplateSubscription = this.builderNavbarService.navbarTemplate.subscribe(navbarResponse => {
      if (navbarResponse) {
        this.navbarTemplate = navbarResponse;

        this.defaultNavbarStyleSubscription = this.builderNavbarService.getDefaultNavbarStyle(this.navbarTemplate).subscribe(response => {
          if (response) {
            this.defaultNavbarStyle = response;
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

    this.websiteChangeCountSubscription = this.builderService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });

    this.builderComponentsSubscription = this.builderComponentService.pageComponents.subscribe(response => {
      if (response) {
        this.pageComponents = response;
      }
    });
  }

  onThemeChange() {
    if (this.navbarTheme === ActiveThemes.Default) {
      this.resetToDefault();
    } else {
      this.builderNavbarService.navbarTheme.next(this.navbarTheme);
      this.builderNavbarService.setNavbarTheme(this.navbarTheme);
    }
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setNavbarStyle() {
    this.builderNavbarService.navbarStyle.next(this.navbarStyle);
  }

  setNavbarBrandStyle() {
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  setNavbarLinkStyle() {
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  resetToDefault() {
    this.builderNavbarService.navbarTheme.next(ActiveThemes.Default);

    this.navbarStyle['background-color'] = this.defaultNavbarStyle['navbarStyle']['background-color'];
    this.builderNavbarService.navbarStyle.next(this.navbarStyle);

    this.navbarBrandStyle['color'] = this.defaultNavbarStyle['navbarBrandStyle']['color'];
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);

    this.navbarLinkStyle['color'] = this.defaultNavbarStyle['navbarLinkStyle']['color'];
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  setChanges() {
    const timestamp = new Date().getTime();
    for (let i = 0; i < this.pageComponents['pages'].length; i++) {
      for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
        if (this.pageComponents['pages'][i]['components'][j]['componentName'] === ActiveComponentsPartialSelector.Navbar) {
          this.pageComponents['pages'][i]['components'][j]['timestamp'] = timestamp;
          this.pageComponents['pages'][i]['components'][j]['navbarTheme'] = this.navbarTheme;
          this.pageComponents['pages'][i]['components'][j]['navbarStyle'] = this.navbarStyle;
          this.pageComponents['pages'][i]['components'][j]['navbarBrandStyle'] = this.navbarBrandStyle;
          this.pageComponents['pages'][i]['components'][j]['navbarLinkStyle'] = this.navbarLinkStyle;
        }
      }
    }
    this.builderComponentService.pageComponents.next(this.pageComponents);
  }

  ngOnDestroy() {
    this.setChanges();
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

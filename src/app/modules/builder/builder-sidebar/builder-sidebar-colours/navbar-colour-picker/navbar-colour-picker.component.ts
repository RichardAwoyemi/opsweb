import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { ActiveNavbarThemes, ActiveTemplates } from '../../../builder';

@Component({
  selector: 'app-navbar-colour-picker',
  templateUrl: './navbar-colour-picker.component.html'
})
export class NavbarColourPickerComponent implements OnInit {
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
  navbarTheme: string = ActiveNavbarThemes.Default;
  defaultNavbarStyle: any;
  private navbarStyleSubscription: Subscription;
  private navbarBrandStyleSubscription: Subscription;
  private navbarLinkStyleSubscription: Subscription;
  private navbarTemplateSubscription: Subscription;
  private navbarThemeSubscription: Subscription;
  private navbarThemesSubscription: Subscription;
  private defaultNavbarStyleSubscription: Subscription;

  constructor(
    private builderNavbarService: BuilderNavbarService
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

    this.navbarTemplateSubscription = this.builderNavbarService.navbarTemplate.subscribe(response => {
      if (response) {
        this.navbarTemplate = response;

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
  }

  onThemeChange() {
    if (this.navbarTheme === ActiveNavbarThemes.Default) {
      this.resetToDefault();
    } else {
      this.builderNavbarService.navbarTheme.next(this.navbarTheme);
      this.builderNavbarService.setNavbarTheme(this.navbarTheme);
    }
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
    this.builderNavbarService.navbarTheme.next(ActiveNavbarThemes.Default);

    this.navbarStyle['background-color'] = this.defaultNavbarStyle['navbarStyle']['background-color'];
    this.builderNavbarService.navbarStyle.next(this.navbarStyle);

    this.navbarBrandStyle['color'] = this.defaultNavbarStyle['navbarBrandStyle']['color'];
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);

    this.navbarLinkStyle['color'] = this.defaultNavbarStyle['navbarLinkStyle']['color'];
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
  }
}

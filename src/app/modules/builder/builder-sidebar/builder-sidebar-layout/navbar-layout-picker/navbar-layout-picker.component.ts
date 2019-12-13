import { Component, OnInit } from '@angular/core';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar-layout-picker',
  templateUrl: './navbar-layout-picker.component.html',
  styleUrls: ['./navbar-layout-picker.component.css']
})
export class NavbarLayoutPickerComponent implements OnInit {
  navbarLinkPaddingTop: number = 0;
  navbarLinkPaddingLeft: number = 0;
  navbarLinkPaddingRight: number = 0;
  navbarLinkPaddingBottom: number = 0;
  navbarLogoImagePaddingTop: number = 0;
  navbarLogoImagePaddingLeft: number = 0;
  navbarLogoImagePaddingRight: number = 0;
  navbarLogoImagePaddingBottom: number = 0;
  navbarBrandPaddingTop: number = 0;
  navbarBrandPaddingLeft: number = 0;
  navbarBrandPaddingRight: number = 0;
  navbarBrandPaddingBottom: number = 0;
  navbarLinkStyle: any;
  navbarLogoImageStyle: any;
  navbarLogoImage: any;
  navbarBrandStyle: any;
  navbarTemplate: any;
  defaultNavbarStyle: any;
  private navbarLinkStyleSubscription: Subscription;
  private navbarBrandStyleSubscription: Subscription;
  private navbarLogoImageStyleSubscription: Subscription;
  private navbarLogoImageSubscription: Subscription;
  private navbarTemplateSubscription: Subscription;
  private defaultNavbarStyleSubscription: Subscription;

  constructor(
    private builderNavbarService: BuilderNavbarService
  ) {
  }

  ngOnInit(): void {
    this.navbarLinkStyleSubscription = this.builderNavbarService.navbarLinkStyle.subscribe(response => {
      if (response) {
        this.navbarLinkStyle = response;
      }
    });

    this.navbarLogoImageSubscription = this.builderNavbarService.navbarLogoImage.subscribe(response => {
      if (response) {
        this.navbarLogoImage = response;
      }
    });

    this.navbarLogoImageStyleSubscription = this.builderNavbarService.navbarLogoImageStyle.subscribe(response => {
      if (response) {
        this.navbarLogoImageStyle = response;
        if (this.navbarLogoImageStyle['padding-top']) {
          this.navbarLogoImagePaddingTop = this.navbarLogoImageStyle['padding-top'].replace('px', '');
        }
        if (this.navbarLogoImageStyle['padding-left']) {
          this.navbarLogoImagePaddingLeft = this.navbarLogoImageStyle['padding-left'].replace('px', '');
        }
        if (this.navbarLogoImageStyle['padding-right']) {
          this.navbarLogoImagePaddingRight = this.navbarLogoImageStyle['padding-right'].replace('px', '');
        }
        if (this.navbarLogoImageStyle['padding-bottom']) {
          this.navbarLogoImagePaddingBottom = this.navbarLogoImageStyle['padding-bottom'].replace('px', '');
        }
      }
    });

    this.navbarLinkStyleSubscription = this.builderNavbarService.navbarLinkStyle.subscribe(response => {
      if (response) {
        this.navbarLinkStyle = response;
        if (this.navbarLinkStyle['padding-top']) {
          this.navbarLinkPaddingTop = this.navbarLinkStyle['padding-top'].replace('px', '');
        }
        if (this.navbarLinkStyle['padding-left']) {
          this.navbarLinkPaddingLeft = this.navbarLinkStyle['padding-left'].replace('px', '');
        }
        if (this.navbarLinkStyle['padding-right']) {
          this.navbarLinkPaddingRight = this.navbarLinkStyle['padding-right'].replace('px', '');
        }
        if (this.navbarLinkStyle['padding-bottom']) {
          this.navbarLinkPaddingBottom = this.navbarLinkStyle['padding-bottom'].replace('px', '');
        }
      }
    });

    this.navbarBrandStyleSubscription = this.builderNavbarService.navbarBrandStyle.subscribe(response => {
      if (response) {
        this.navbarBrandStyle = response;
        if (this.navbarBrandStyle['padding-top']) {
          this.navbarBrandPaddingTop = this.navbarBrandStyle['padding-top'].replace('px', '');
        }
        if (this.navbarBrandStyle['padding-left']) {
          this.navbarBrandPaddingLeft = this.navbarBrandStyle['padding-left'].replace('px', '');
        }
        if (this.navbarBrandStyle['padding-right']) {
          this.navbarBrandPaddingRight = this.navbarBrandStyle['padding-right'].replace('px', '');
        }
        if (this.navbarBrandStyle['padding-bottom']) {
          this.navbarBrandPaddingBottom = this.navbarBrandStyle['padding-bottom'].replace('px', '');
        }
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
  }

  setNavbarLayoutClass(navbarLayoutClass: string) {
    this.builderNavbarService.navbarLayoutClass.next(navbarLayoutClass);
  }

  setNavbarLogoImagePaddingTop() {
    this.navbarLogoImageStyle['padding-top'] = `${ this.navbarLogoImagePaddingTop }px`;
    this.builderNavbarService.navbarLogoImageStyle.next(this.navbarLogoImageStyle);
  }

  setNavbarLogoImagePaddingLeft() {
    this.navbarLogoImageStyle['padding-left'] = `${ this.navbarLogoImagePaddingLeft }px`;
    this.builderNavbarService.navbarLogoImageStyle.next(this.navbarLogoImageStyle);
  }

  setNavbarLogoImagePaddingRight() {
    this.navbarLogoImageStyle['padding-right'] = `${ this.navbarLogoImagePaddingRight }px`;
    this.builderNavbarService.navbarLogoImageStyle.next(this.navbarLogoImageStyle);
  }

  setNavbarLogoImagePaddingBottom() {
    this.navbarLogoImageStyle['padding-bottom'] = `${ this.navbarLogoImagePaddingBottom }px`;
    this.builderNavbarService.navbarLogoImageStyle.next(this.navbarLogoImageStyle);
  }

  setNavbarBrandPaddingTop() {
    this.navbarBrandStyle['padding-top'] = `${ this.navbarBrandPaddingTop }px`;
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  setNavbarBrandPaddingLeft() {
    this.navbarBrandStyle['padding-left'] = `${ this.navbarBrandPaddingLeft }px`;
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  setNavbarBrandPaddingRight() {
    this.navbarBrandStyle['padding-right'] = `${ this.navbarBrandPaddingRight }px`;
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  setNavbarBrandPaddingBottom() {
    this.navbarBrandStyle['padding-bottom'] = `${ this.navbarBrandPaddingBottom }px`;
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  setNavbarLinkPaddingTop() {
    this.navbarLinkStyle['padding-top'] = `${ this.navbarLinkPaddingTop }px`;
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  setNavbarLinkPaddingLeft() {
    this.navbarLinkStyle['padding-left'] = `${ this.navbarLinkPaddingLeft }px`;
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  setNavbarLinkPaddingRight() {
    this.navbarLinkStyle['padding-right'] = `${ this.navbarLinkPaddingRight }px`;
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  setNavbarLinkPaddingBottom() {
    this.navbarLinkStyle['padding-bottom'] = `${ this.navbarLinkPaddingBottom }px`;
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  isNavbarLogoImageNull() {
    return !this.navbarLogoImage || this.navbarLogoImage == 'navbarLogoImage';
  }

  resetNavbarLinkStyle() {
    this.navbarLinkStyle['padding-top'] = this.defaultNavbarStyle['navbarLinkStyle']['padding-top'];
    this.navbarLinkStyle['padding-left'] = this.defaultNavbarStyle['navbarLinkStyle']['padding-left'];
    this.navbarLinkStyle['padding-right'] = this.defaultNavbarStyle['navbarLinkStyle']['padding-right'];
    this.navbarLinkStyle['padding-bottom'] = this.defaultNavbarStyle['navbarLinkStyle']['padding-bottom'];
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
    this.setNavbarLayoutClass('navbar-nav ml-auto');
  }

  resetNavbarBrandStyle() {
    this.navbarBrandStyle['padding-top'] = this.defaultNavbarStyle['navbarBrandStyle']['padding-top'];
    this.navbarBrandStyle['padding-left'] = this.defaultNavbarStyle['navbarBrandStyle']['padding-left'];
    this.navbarBrandStyle['padding-right'] = this.defaultNavbarStyle['navbarBrandStyle']['padding-right'];
    this.navbarBrandStyle['padding-bottom'] = this.defaultNavbarStyle['navbarBrandStyle']['padding-bottom'];
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
    this.setNavbarLayoutClass('navbar-nav ml-auto');
  }

  resetNavbarLogoImageStyle() {
    this.navbarLogoImageStyle['padding-top'] = this.defaultNavbarStyle['navbarLogoImageStyle']['padding-top'];
    this.navbarLogoImageStyle['padding-left'] = this.defaultNavbarStyle['navbarLogoImageStyle']['padding-left'];
    this.navbarLogoImageStyle['padding-right'] = this.defaultNavbarStyle['navbarLogoImageStyle']['padding-right'];
    this.navbarLogoImageStyle['padding-bottom'] = this.defaultNavbarStyle['navbarLogoImageStyle']['padding-bottom'];
    this.builderNavbarService.navbarLogoImageStyle.next(this.navbarLogoImageStyle);
    this.setNavbarLayoutClass('navbar-nav ml-auto');
  }
}

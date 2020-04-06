import { Component, OnDestroy, OnInit } from '@angular/core';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { Subscription } from 'rxjs';
import { ActiveComponents, ActiveComponentsPartialSelector } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { TemplateService } from '../../../../../shared/services/template.service';

@Component({
  selector: 'app-navbar-layout-picker',
  templateUrl: './navbar-layout-picker.component.html',
  styleUrls: ['./navbar-layout-picker.component.css']
})
export class NavbarLayoutPickerComponent implements OnInit, OnDestroy {
  navbarLinkPaddingTop = 0;
  navbarLinkPaddingLeft = 0;
  navbarLinkPaddingRight = 0;
  navbarLinkPaddingBottom = 0;
  navbarLogoImagePaddingTop = 0;
  navbarLogoImagePaddingLeft = 0;
  navbarLogoImagePaddingRight = 0;
  navbarLogoImagePaddingBottom = 0;
  navbarBrandPaddingTop = 0;
  navbarBrandPaddingLeft = 0;
  navbarBrandPaddingRight = 0;
  navbarBrandPaddingBottom = 0;
  navbarLinkStyle: any;
  navbarLogoImageStyle: any;
  navbarLogoImage: any;
  navbarBrandStyle: any;
  navbarTemplate: any;
  defaultNavbarStyle: any;
  pageComponents: any;

  private navbarLinkStyleSubscription: Subscription;
  private navbarBrandStyleSubscription: Subscription;
  private navbarLogoImageStyleSubscription: Subscription;
  private navbarLogoImageSubscription: Subscription;
  private navbarTemplateSubscription: Subscription;
  private builderComponentsSubscription: Subscription;
  private defaultNavbarStyleSubscription: Subscription;

  constructor(
    private templateService: TemplateService,
    private builderNavbarService: BuilderNavbarService,
    private builderComponentsService: BuilderComponentsService
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

    this.navbarTemplateSubscription = this.builderNavbarService.navbarTemplate.subscribe(navbarTemplateResponse => {
      if (navbarTemplateResponse) {
        this.navbarTemplate = navbarTemplateResponse;

        this.defaultNavbarStyleSubscription = this.templateService.getTemplateStyle(this.navbarTemplate).subscribe(response => {
          if (response) {
            this.defaultNavbarStyle = response[ActiveComponents.Navbar];
          }
        });
      }
    });

    this.builderComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
      if (response) {
        this.pageComponents = response;
      }
    });
  }

  setNavbarLayoutClass(navbarLayoutClass: string) {
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLayoutClass', navbarLayoutClass);
    this.builderNavbarService.navbarLayoutClass.next(navbarLayoutClass);
  }

  setNavbarLogoImagePaddingTop() {
    this.navbarLogoImageStyle['padding-top'] = `${this.navbarLogoImagePaddingTop}px`;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLogoImageStyle', this.navbarLogoImageStyle);
    this.builderNavbarService.navbarLogoImageStyle.next(this.navbarLogoImageStyle);
  }

  setNavbarLogoImagePaddingLeft() {
    this.navbarLogoImageStyle['padding-left'] = `${this.navbarLogoImagePaddingLeft}px`;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLogoImageStyle', this.navbarLogoImageStyle);
    this.builderNavbarService.navbarLogoImageStyle.next(this.navbarLogoImageStyle);
  }

  setNavbarLogoImagePaddingRight() {
    this.navbarLogoImageStyle['padding-right'] = `${this.navbarLogoImagePaddingRight}px`;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLogoImageStyle', this.navbarLogoImageStyle);
    this.builderNavbarService.navbarLogoImageStyle.next(this.navbarLogoImageStyle);
  }

  setNavbarLogoImagePaddingBottom() {
    this.navbarLogoImageStyle['padding-bottom'] = `${this.navbarLogoImagePaddingBottom}px`;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLogoImageStyle', this.navbarLogoImageStyle);
    this.builderNavbarService.navbarLogoImageStyle.next(this.navbarLogoImageStyle);
  }

  setNavbarBrandPaddingTop() {
    this.navbarBrandStyle['padding-top'] = `${this.navbarBrandPaddingTop}px`;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', this.navbarBrandStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  setNavbarBrandPaddingLeft() {
    this.navbarBrandStyle['padding-left'] = `${this.navbarBrandPaddingLeft}px`;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', this.navbarBrandStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  setNavbarBrandPaddingRight() {
    this.navbarBrandStyle['padding-right'] = `${this.navbarBrandPaddingRight}px`;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', this.navbarBrandStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  setNavbarBrandPaddingBottom() {
    this.navbarBrandStyle['padding-bottom'] = `${this.navbarBrandPaddingBottom}px`;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', this.navbarBrandStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  setNavbarLinkPaddingTop() {
    this.navbarLinkStyle['padding-top'] = `${this.navbarLinkPaddingTop}px`;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLinkStyle', this.navbarLinkStyle);
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  setNavbarLinkPaddingLeft() {
    this.navbarLinkStyle['padding-left'] = `${this.navbarLinkPaddingLeft}px`;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLinkStyle', this.navbarLinkStyle);
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  setNavbarLinkPaddingRight() {
    this.navbarLinkStyle['padding-right'] = `${this.navbarLinkPaddingRight}px`;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLinkStyle', this.navbarLinkStyle);
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  setNavbarLinkPaddingBottom() {
    this.navbarLinkStyle['padding-bottom'] = `${this.navbarLinkPaddingBottom}px`;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLinkStyle', this.navbarLinkStyle);
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  isNavbarLogoImageNull() {
    return !this.navbarLogoImage || this.navbarLogoImage === 'navbarLogoImage';
  }

  resetNavbarLinkStyle() {
    this.navbarLinkStyle['padding-top'] = this.defaultNavbarStyle['style']['navbarLinkStyle']['padding-top'];
    this.navbarLinkStyle['padding-left'] = this.defaultNavbarStyle['style']['navbarLinkStyle']['padding-left'];
    this.navbarLinkStyle['padding-right'] = this.defaultNavbarStyle['style']['navbarLinkStyle']['padding-right'];
    this.navbarLinkStyle['padding-bottom'] = this.defaultNavbarStyle['style']['navbarLinkStyle']['padding-bottom'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLinkStyle', this.navbarLinkStyle);
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
    this.setNavbarLayoutClass('navbar-nav ml-auto');
  }

  resetNavbarBrandStyle() {
    this.navbarBrandStyle['padding-top'] = this.defaultNavbarStyle['style']['navbarBrandStyle']['padding-top'];
    this.navbarBrandStyle['padding-left'] = this.defaultNavbarStyle['style']['navbarBrandStyle']['padding-left'];
    this.navbarBrandStyle['padding-right'] = this.defaultNavbarStyle['style']['navbarBrandStyle']['padding-right'];
    this.navbarBrandStyle['padding-bottom'] = this.defaultNavbarStyle['style']['navbarBrandStyle']['padding-bottom'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', this.navbarBrandStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
    this.setNavbarLayoutClass('navbar-nav ml-auto');
  }

  resetNavbarLogoImageStyle() {
    this.navbarLogoImageStyle['padding-top'] = this.defaultNavbarStyle['style']['navbarLogoImageStyle']['padding-top'];
    this.navbarLogoImageStyle['padding-left'] = this.defaultNavbarStyle['style']['navbarLogoImageStyle']['padding-left'];
    this.navbarLogoImageStyle['padding-right'] = this.defaultNavbarStyle['style']['navbarLogoImageStyle']['padding-right'];
    this.navbarLogoImageStyle['padding-bottom'] = this.defaultNavbarStyle['style']['navbarLogoImageStyle']['padding-bottom'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLogoImageStyle', this.navbarLogoImageStyle);
    this.builderNavbarService.navbarLogoImageStyle.next(this.navbarLogoImageStyle);
    this.setNavbarLayoutClass('navbar-nav ml-auto');
  }

  ngOnDestroy() {
    this.navbarLinkStyleSubscription.unsubscribe();
    this.navbarBrandStyleSubscription.unsubscribe();
    this.navbarLogoImageStyleSubscription.unsubscribe();
    this.navbarLogoImageSubscription.unsubscribe();
    this.navbarTemplateSubscription.unsubscribe();
    this.defaultNavbarStyleSubscription.unsubscribe();
    this.builderComponentsSubscription.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-navbar-layout-picker',
  templateUrl: './navbar-layout-picker.component.html',
  styleUrls: ['./navbar-layout-picker.component.css']
})
export class NavbarLayoutPickerComponent {
  navbarLogoValue: number = 5;
  navbarLogoOptions: Options = {
    floor: 0,
    ceil: 10
  };
  navbarMenuValue: number = 5;
  navbarMenuOptions: Options = {
    floor: 0,
    ceil: 10
  };

  constructor(
    private builderNavbarService: BuilderNavbarService
  ) {
  }

  setNavbarLayoutClass(navbarLayoutClass: string) {
    this.builderNavbarService.navbarLayoutClass.next(navbarLayoutClass);
  }
}

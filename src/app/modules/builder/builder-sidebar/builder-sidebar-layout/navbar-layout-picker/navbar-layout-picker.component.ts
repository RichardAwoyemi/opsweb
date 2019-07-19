import { Component } from '@angular/core';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';

@Component({
  selector: 'app-navbar-layout-picker',
  templateUrl: './navbar-layout-picker.component.html',
  styleUrls: ['./navbar-layout-picker.component.css']
})
export class NavbarLayoutPickerComponent {
  constructor(
    private builderNavbarService: BuilderNavbarService
  ) {
  }

  setNavbarLayoutClass(navbarLayoutClass: string) {
    this.builderNavbarService.navbarLayoutClass.next(navbarLayoutClass);
  }
}

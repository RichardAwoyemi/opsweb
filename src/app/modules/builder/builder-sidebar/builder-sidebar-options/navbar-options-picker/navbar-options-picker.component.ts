import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';

@Component({
  selector: 'app-navbar-options-picker',
  templateUrl: './navbar-options-picker.component.html',
  styleUrls: ['./navbar-options-picker.component.css']
})
export class NavbarOptionsPickerComponent implements OnInit {
  navbarMenuOptions: any;
  private navbarMenuOptionsSubscription: Subscription;

  constructor(
    private builderNavbarService: BuilderNavbarService
  ) {
  }

  ngOnInit() {
    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    });
  }

  uploadLogo() {
  }
}

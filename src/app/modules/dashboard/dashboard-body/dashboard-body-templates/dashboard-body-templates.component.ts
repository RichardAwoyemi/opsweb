import { Component, OnInit } from '@angular/core';
import { Template } from '../../../../shared/models/template';
import { DataService } from '../../../../shared/services/data.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromUser from '../../../core/store/user/user.reducer';
import { IUser } from '../../../../shared/models/user';

@Component({
  selector: 'app-dashboard-body-templates',
  templateUrl: './dashboard-body-templates.component.html'
})
export class DashboardBodyTemplatesComponent implements OnInit {
  user: IUser;
  innerHeight: number;
  searchText: string;
  webTemplates: Template[];
  private webTemplateSubscription: Subscription;

  constructor(
    private dataService: DataService,
    private userStore: Store<fromUser.State>
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.webTemplateSubscription = this.dataService.getAllWebTemplates().subscribe(response => {
      if (response) {
        this.webTemplates = [].concat.apply([], response);
      }
    });

    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
        }
      });
  }
}

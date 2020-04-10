import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Template } from '../../../../shared/models/template';
import { IUser } from '../../../../shared/models/user';
import { DataService } from '../../../../shared/services/data.service';
import * as fromUser from '../../../core/store/user/user.reducer';

@Component({
  selector: 'app-dashboard-body-templates',
  templateUrl: './dashboard-body-templates.component.html'
})
export class DashboardBodyTemplatesComponent implements OnInit, OnDestroy {
  user: IUser;
  innerHeight: number;
  searchText: string;
  webTemplates: Template[];
  ngUnsubscribe = new Subject<void>();

  constructor(
    private dataService: DataService,
    private userStore: Store<fromUser.State>,
    private ngxLoader: NgxUiLoaderService
  ) {
  }

  ngOnInit() {
    this.ngxLoader.start();

    this.innerHeight = window.innerHeight;

    this.dataService.getAllWebTemplates().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.webTemplates = [].concat.apply([], response);
        }
      });

    this.userStore.select('user')
      .pipe()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
        }
      });

    this.ngxLoader.stop();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

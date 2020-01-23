import { Component, OnInit } from '@angular/core';
import { Template } from '../../../../shared/models/template';
import { DataService } from '../../../../shared/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-body-templates',
  templateUrl: './dashboard-body-templates.component.html'
})
export class DashboardBodyTemplatesComponent implements OnInit {
  innerHeight: number;
  searchText: string;
  webTemplates: Template[];
  private webTemplateSubscription: Subscription;

  constructor(
    private dataService: DataService,
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    this.webTemplateSubscription = this.dataService.getAllWebTemplates().subscribe(response => {
      if (response) {
        this.webTemplates = [].concat.apply([], response);
      }
    });
  }
}

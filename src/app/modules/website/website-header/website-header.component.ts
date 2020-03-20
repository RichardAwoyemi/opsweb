import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-website-header',
  templateUrl: './website-header.component.html',
  styleUrls: ['./website-header.component.css']
})
export class WebsiteHeaderComponent {
  id: string;

  constructor(
    public router: Router,
    private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  redirectToDashboard() {
    this.router.navigate(['dashboard']).then(() => {
    });
  }

  redirectToBuilder() {
    this.router.navigate(['builder', this.id]).then(() => {
    });
  }
}

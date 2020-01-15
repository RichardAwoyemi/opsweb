import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-build-button',
  templateUrl: './home-build-button.component.html'
})
export class HomeBuildButtonComponent {
  @Input() position: string;

  constructor(
    public router: Router
  ) {
  }

  setButtonAlignment(position) {
    if (position === 'center') {
      return 'gap-xy text-center';
    }
    if (position === 'left') {
      return 'gap-xy';
    }
  }

  redirectToBuilder() {
    this.router.navigate(['builder']).then(() => {
    });
  }
}

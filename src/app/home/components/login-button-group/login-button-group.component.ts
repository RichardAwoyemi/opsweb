import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-button-group',
  templateUrl: './login-button-group.component.html'
})
export class LoginButtonGroupComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  @Input() position: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    library.add(faFacebookF, faGoogle, faLongArrowAltRight);
  }

  setButtonAlignment(position) {
    if (position === 'center') {
      return 'gap-xy text-center';
    }
    if (position === 'left') {
      return 'gap-xy';
    }
  }
}

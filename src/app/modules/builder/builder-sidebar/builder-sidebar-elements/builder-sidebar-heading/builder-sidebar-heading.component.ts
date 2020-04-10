import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-heading',
  templateUrl: './builder-sidebar-heading.component.html'
})

export class BuilderSidebarHeadingComponent {
  @Input() data: any;
}

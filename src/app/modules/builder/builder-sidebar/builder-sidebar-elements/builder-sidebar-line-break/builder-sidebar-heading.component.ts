import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-line-break',
  template: `<hr>`
})

export class BuilderSidebarLineBreakComponent {
  @Input() data: any;
}

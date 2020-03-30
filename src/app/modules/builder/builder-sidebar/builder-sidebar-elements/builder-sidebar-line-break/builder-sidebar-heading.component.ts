import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-line-break',
  template: `<hr style="background-color: rgba(255, 255, 255, 0.1)">`
})

export class BuilderSidebarLineBreakComponent {
  @Input() data: any;
}

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-sidebar-heading',
  templateUrl: './builder-sidebar-heading.component.html'
})

export class BuilderSidebarHeadingComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @Input() elementSettings: any;
  includeLineBreak = true;
  condition = true;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderComponentService: BuilderComponentsService
  ) {}

  ngOnInit() {
    if (this.elementSettings.includeLineBreak === false || this.elementSettings.includeLineBreak) {
      this.includeLineBreak = this.elementSettings.includeLineBreak;
    };
    this.builderComponentService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe( response => {
      const pageComponent = response;
      const component = pageComponent['pages'][this.data.pageIndex]['components'][this.data.componentIndex];
      if (this.elementSettings.condition) {
        for (let i = 0; i < this.elementSettings.condition.length; i++) {
          const criteria = this.elementSettings.condition[i];
          if (this.condition || this.elementSettings.any) {
            this.condition = (!!UtilService.getDeepProp(component, criteria.property) === criteria.exists);
            if (this.condition && this.elementSettings.any) { break; }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

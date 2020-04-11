import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounce } from '../../../../shared/decorators/debounce.decorator';
import { Template } from '../../../../shared/models/template';
import { DataService } from '../../../../shared/services/data.service';
import { TemplateService } from '../../../../shared/services/template.service';
import { WebsiteService } from '../../../../shared/services/website.service';
import { ActiveTemplates } from '../../builder';
import { BuilderChangeTemplateModalComponent } from '../../builder-actions/builder-change-template-modal/builder-change-template-modal.component';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-builder-sidebar-templates',
  templateUrl: './builder-sidebar-templates.component.html',
  styleUrls: ['./builder-sidebar-templates.component.css']
})
export class BuilderSidebarTemplatesComponent implements OnInit, OnDestroy {
  innerHeight: number;
  websiteChangeCount: number;
  searchText: string;
  pageComponents: any;
  private webTemplates: Template[];
  private selectedTemplate: Template;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private dataService: DataService,
    private templateService: TemplateService,
    private websiteService: WebsiteService,
    private builderComponentsService: BuilderComponentsService,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) {
  }

  get selectedTemplates() {
    return TemplateService.selectedTemplates;
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    this.setupWebTemplateSubscriptions();
  }

  setupWebTemplateSubscriptions() {
    this.dataService.getAllWebTemplates().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.webTemplates = response;
          this.webTemplates.push({ id: ActiveTemplates.Default, name: 'Default' });
          TemplateService.parseSelectedTemplates([].concat.apply([], this.webTemplates));
          TemplateService.parseAvailableTemplates([].concat.apply([], this.webTemplates));
        }
      });

    this.templateService.selectedTemplate.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.selectedTemplate = response;
        }
      });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.websiteChangeCount = response['value'];
        }
      });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.pageComponents = response;
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.innerHeight = window.innerHeight;
  }

  setTemplate(templateId: string) {
    if (this.websiteChangeCount > 0) {
      const modal = this.modalService.open(BuilderChangeTemplateModalComponent, {
        windowClass: 'modal-holder',
        centered: true
      });
      modal.componentInstance.templateId = templateId;
      this.websiteService.resetWebsiteChangeCount();
    } else {
      this.templateService.updateTemplate(templateId);
      this.toastrService.success('Your template has been updated.', 'Great!');
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

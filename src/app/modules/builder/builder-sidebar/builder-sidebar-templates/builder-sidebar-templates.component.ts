import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Template } from '../../../../shared/models/template';
import { DataService } from '../../../../shared/services/data.service';
import { ActiveTemplates } from '../../builder';
import { TemplateService } from '../../../../shared/services/template.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderChangeTemplateModalComponent } from '../../builder-actions/builder-change-template-modal/builder-change-template-modal.component';
import { BuilderService } from '../../builder.service';
import { debounce } from '../../../../shared/decorators/debounce.decorator';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderFooterService } from '../../builder-components/builder-footer/builder-footer.service';
import { BuilderHeroService } from '../../builder-components/builder-hero/builder-hero.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderFeaturesService } from '../../builder-components/builder-features/builder-features.service';
import { WebsiteService } from '../../../../shared/services/website.service';
import { ToastrService } from 'ngx-toastr';

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

  private webTemplateSubscription: Subscription;
  private templateSubscription: Subscription;
  private selectedTemplateSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;
  private pageComponentsSubscription: Subscription;

  constructor(
    private dataService: DataService,
    private templateService: TemplateService,
    private websiteService: WebsiteService,
    private builderService: BuilderService,
    private builderNavbarService: BuilderNavbarService,
    private builderHeroService: BuilderHeroService,
    private builderFooterService: BuilderFooterService,
    private builderComponentsService: BuilderComponentsService,
    private builderFeaturesService: BuilderFeaturesService,
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
    this.webTemplateSubscription = this.dataService.getAllWebTemplates().subscribe(response => {
      if (response) {
        this.webTemplates = response;
        this.webTemplates.push({id: ActiveTemplates.Default, name: 'Default'});
        TemplateService.parseSelectedTemplates([].concat.apply([], this.webTemplates));
        TemplateService.parseAvailableTemplates([].concat.apply([], this.webTemplates));
      }
    });

    this.selectedTemplateSubscription = this.templateService.selectedTemplate.subscribe(response => {
      if (response) {
        this.selectedTemplate = response;
      }
    });

    this.websiteChangeCountSubscription = this.websiteService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });

    this.pageComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
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
    this.templateSubscription = this.templateService.getTemplate(templateId).subscribe(response => {
      if (response) {
        if (this.websiteChangeCount > 0) {
          const modal = this.modalService.open(BuilderChangeTemplateModalComponent, {
            windowClass: 'modal-holder',
            centered: true
          });
          modal.componentInstance.templateId = templateId;
          this.websiteService.resetWebsiteChangeCount();
        } else {
          this.pageComponents['template'] = templateId;
          this.builderComponentsService.pageComponents.next(this.pageComponents);
          this.builderNavbarService.setComponentTemplate(templateId);
          this.builderHeroService.setComponentTemplate(templateId);
          this.builderFooterService.setComponentTemplate(templateId);
          this.builderFeaturesService.setComponentTemplate(templateId);
          this.toastrService.success('Your template has been updated.', 'Great!');
        }
      }
    });
  }

  ngOnDestroy() {
    this.webTemplateSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
    this.selectedTemplateSubscription.unsubscribe();
    if (this.templateSubscription) {
      this.templateSubscription.unsubscribe();
    }
  }
}

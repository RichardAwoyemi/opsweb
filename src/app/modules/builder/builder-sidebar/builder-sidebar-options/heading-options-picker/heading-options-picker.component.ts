import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UtilService } from '../../../../../shared/services/util.service';
import { BuilderSelectImageModalComponent } from '../../../builder-actions/builder-select-image-modal/builder-select-image-modal.component';
import { BuilderHeadingService } from '../../../builder-components/builder-heading/builder-heading.service';
import { BuilderService } from '../../../builder.service';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';

@Component({
  selector: 'app-heading-options-picker',
  templateUrl: './heading-options-picker.component.html',
  styleUrls: ['./heading-options-picker.component.css'],
})
export class HeadingOptionsPickerComponent implements OnInit, OnDestroy {
  fontNames: any;
  fontUnits: any;
  navbarMenuOptions: any;
  menuOption: string;
  headingHeaderStyle: any;
  headingSubheaderStyle: any;
  headingBackgroundStyle: any;
  headingStyle: any;
  headingItemArray: any;
  headingCopyrightFontSize: number;
  defaultHeadingStyle: any;
  headingTemplate: string;
  headingFont: string = 'Avenir Next Regular';
  headingHeaderFontSize: string = '20';
  headingSubheaderFontSize: string = '14';
  websiteChangeCount: number;
  numberOfHeading: number;
  subheaderCondition: boolean = true;
  buttonCondition: boolean = true;
  headingBackgroundImageUrl: string;
  headingBackgroundImageAlt: string;
  percentSymbol = '%';
  opacityPercentage = 100;
  backgroundImageCondition = false;
  backgroundPositionX = 0;
  backgroundPositionY = 0;
  activeEditComponentId: string;
  previewStyle = {
    'height': '100%',
    'width': '100%',
    'background-repeat':'no-repeat',
    'background-position':'center',
    'background-size':'contain',
    'background-attachment': 'scroll'
  };
  backgroundAttachment = { 'Fixed': 'scroll', 'Moving': 'fixed'};
  backgroundAttachmentKeys = Object.keys(this.backgroundAttachment);
  displayedBackgroundAttachment = 'Fixed';

  private headingBackgroundStyleSubscription: Subscription;
  private navbarMenuOptionsSubscription: Subscription;
  private fontNamesSubscription: Subscription;
  private fontUnitsSubscription: Subscription;
  private headingHeaderStyleSubscription: Subscription;
  private headingSubheaderStyleSubscription: Subscription;
  private headingStyleSubscription: Subscription;
  private headingTemplateSubscription: Subscription;
  private defaultHeadingStyleSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;
  private subheaderConditionSubscription: Subscription;
  private buttonConditionSubscription: Subscription;
  private headingBackgroundImageUrlSubscription: Subscription;
  private headingBackgroundImageAltSubscription: Subscription;
  private headingMenuOptionSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private utilService: UtilService,
    private builderHeadingService: BuilderHeadingService,
    private builderService: BuilderService,
    private builderNavbarService: BuilderNavbarService
  ) {
  }

  ngOnInit() {

    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
        if (this.activeEditComponentId != response) { this.updateSidebar(); }
        this.activeEditComponentId = response;
    });

    this.headingHeaderStyleSubscription = this.builderHeadingService.headingHeaderStyle.subscribe(response => {
      this.headingHeaderStyle = response;
    });

    this.headingBackgroundStyleSubscription = this.builderHeadingService.headingBackgroundStyle.subscribe(response => {
      this.headingBackgroundStyle = response;
      this.backgroundImageCondition = !(this.headingBackgroundStyle['background-image'] == null);
      this.updateSidebar();
    });

    this.headingSubheaderStyleSubscription = this.builderHeadingService.headingSubheaderStyle.subscribe(response => {
      this.headingSubheaderStyle = response;
    });

    this.headingStyleSubscription = this.builderHeadingService.headingStyle.subscribe(response => {
      this.headingStyle = response;
      const opacityDecimal = this.utilService.hexToRgbA(this.headingStyle['background-color']).match(/(?<=\,)([^,]*)(?=\))/)[0];
      this.opacityPercentage = (1 - opacityDecimal) * 100;
    });

    this.fontNamesSubscription = this.builderService.fontNames.subscribe(response => {
      if (response) {
        this.fontNames = response;
      }
    });

    this.fontUnitsSubscription = this.builderService.fontUnits.subscribe(response => {
      if (response) {
        this.fontUnits = response;
      }
    });

    this.headingTemplateSubscription = this.builderHeadingService.headingTemplate.subscribe(response => {
      if (response) {
        this.headingTemplate = response;

        this.defaultHeadingStyleSubscription = this.builderHeadingService.getDefaultHeadingStyle(this.headingTemplate).subscribe(response => {
          if (response) {
            this.defaultHeadingStyle = response;
          }
        });
      }
    });

    this.subheaderConditionSubscription = this.builderHeadingService.headingSubheaderCondition.subscribe(response => {
      if (response) {
        this.subheaderCondition = response;
      }
    });

    this.headingBackgroundImageUrlSubscription = this.builderHeadingService.headingBackgroundImageUrl.subscribe(response => {
      if (response) {
        this.headingBackgroundImageUrl = response;
      }
    });

    this.headingBackgroundImageAltSubscription = this.builderHeadingService.headingBackgroundImageAlt.subscribe(response => {
      if (response) {
        this.headingBackgroundImageAlt = response;
      }
    });

    this.buttonConditionSubscription = this.builderHeadingService.headingButtonCondition.subscribe(response => {
      if (response) {
        this.buttonCondition = response;
      }
    });

    this.websiteChangeCountSubscription = this.builderService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });

    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;

        this.headingMenuOptionSubscription = this.builderHeadingService.headingButtonLink.subscribe(response => {
          if (response) {
            this.menuOption = response;
          } else {
            if (this.navbarMenuOptions.length > 0) {
              this.menuOption = this.navbarMenuOptions[1];
            } else {
              this.menuOption = this.navbarMenuOptions[0];
            }
          }
        });
      }
    });
  }

  resetHeadingButtonLink() {
    if (this.navbarMenuOptions.length > 0) {
      this.menuOption = this.navbarMenuOptions[1];
    } else {
      this.menuOption = this.navbarMenuOptions[0];
    }
    this.builderHeadingService.headingButtonLink.next(this.menuOption);
  }

  setHeadingButtonLink() {
    this.builderHeadingService.headingButtonLink.next(this.menuOption);
  }

  onHeadingFontChange(parameterName: string, parameter: any, isHeader: boolean = true, isSubheader: boolean = true) {
    if (isHeader) {
      this.headingHeaderStyle[parameterName] = parameter;
      this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
      this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
    }

    if (isSubheader) {
      this.headingSubheaderStyle[parameterName] = parameter;
      this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
      this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
    }
  }

  onBackgroundSizeChange() {
    this.builderHeadingService.headingBackgroundStyle.next(this.headingBackgroundStyle);
  }

  onBackgroundAttachmentChange(){
    this.headingBackgroundStyle['background-attachment'] =  this.backgroundAttachment[this.displayedBackgroundAttachment];
    this.builderHeadingService.headingBackgroundStyle.next(this.headingBackgroundStyle);
  }

  resetBackgroundSize() {
    this.headingBackgroundStyle['background-size'] = this.defaultHeadingStyle['headingBackgroundStyle']['background-size'];
    this.builderHeadingService.headingBackgroundStyle.next(this.headingBackgroundStyle);
  }

  openSelectImageModal() {
    const modalRef = this.modalService.open(BuilderSelectImageModalComponent, { windowClass: 'modal-holder', centered: true, size: 'lg' });
    modalRef.componentInstance.currentImageUrl = this.builderHeadingService.headingBackgroundImageUrl;
    modalRef.componentInstance.currentImageAlt = this.builderHeadingService.headingBackgroundImageAlt;
  }

  resetHeadingFontSize() {
    this.headingHeaderStyle['font-size'] = this.defaultHeadingStyle['headingHeaderStyle']['font-size'];
    this.headingSubheaderStyle['font-size'] = this.defaultHeadingStyle['headingSubheaderStyle']['font-size'];
    this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
    this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
  }

  resetHeadingFontName() {
    this.headingHeaderStyle['font-family'] = this.defaultHeadingStyle['headingHeaderStyle']['font-family'];
    this.headingSubheaderStyle['font-family'] = this.defaultHeadingStyle['headingSubheaderStyle']['font-family'];
    const headingFont = this.headingHeaderStyle['font-family'].split(','); //header assumed to be the same
    this.headingFont = headingFont[0].replace(/'/g, '');
    this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
    this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
  }

  toggleOptionVisibility(option: string) {
    switch (option) {
      case 'Subheader':
        this.subheaderCondition = !this.subheaderCondition;
        this.builderHeadingService.headingSubheaderCondition.next(this.subheaderCondition);
        break;
      case 'Button':
        this.buttonCondition = !this.buttonCondition;
        this.builderHeadingService.headingButtonCondition.next(this.buttonCondition);
        break;
      default:
        break;
    }
  }

  setBackgroundOpacity(opacity) {
    if (this.backgroundImageCondition) {
      const preOpacictyColor = this.utilService.hexToRgbA(this.builderHeadingService.headingStyle.getValue()['background-color']);
      const opactictyDecimal = 1 - opacity / 100;
      const postOpacityColor = preOpacictyColor.replace(/(?<=\,)([^,]*)(?=\))/, opactictyDecimal);
      this.headingStyle['background-color'] = postOpacityColor;
      this.builderHeadingService.headingStyle.next(this.headingStyle);
    }
  }

  setBackgroundPosition(axis, selectedVar) {
    const param = 'background-position-' + axis;
    this.headingBackgroundStyle[param] = selectedVar + '%';
    this.builderHeadingService.headingBackgroundImageStyle.next(this.headingBackgroundStyle);
  }

  resetBackgroundPosition(axis) {
    switch (axis) {
      case 'x':
        this.backgroundPositionX = 0;
        this.setBackgroundPosition('x', this.backgroundPositionX);
        break
      case 'y':
        this.backgroundPositionY = 0;
        this.setBackgroundPosition('y', this.backgroundPositionY);
        break
      default:
        break;
    }
  }


  isOptionVisible(option: string): boolean {
    switch (option) {
      case 'Subheader':
        return this.subheaderCondition;
      case 'Button':
        return this.buttonCondition;
      default:
        break;
    }
  }

  removeBackgroundImage() {
    this.builderHeadingService.headingBackgroundImageUrl.next(null);
    this.opacityPercentage = 100;
    const preOpacictyColor = this.utilService.hexToRgbA(this.builderHeadingService.headingStyle.getValue()['background-color']);
    this.headingStyle['background-color'] = preOpacictyColor.replace(/(?<=\,)([^,]*)(?=\))/, 1);
    this.builderHeadingService.headingStyle.next(this.headingStyle);
  }

  updateSidebar() {
    this.backgroundPositionX = Math.floor(this.builderHeadingService.headingBackgroundStyle.getValue()['background-position-x']) || 0;
    this.backgroundPositionY = Math.floor(this.builderHeadingService.headingBackgroundStyle.getValue()['background-position-y']) || 0;
    this.opacityPercentage = Math.floor((1 - this.utilService.hexToRgbA(this.builderHeadingService.headingStyle.getValue()['background-color']).match(/(?<=\,)([^,]*)(?=\))/)[0]) * 100);
    this.headingBackgroundStyle = this.builderHeadingService.headingBackgroundStyle.getValue();
    this.headingBackgroundImageUrl = this.headingBackgroundStyle['background-image'] || null;
    this.backgroundImageCondition = this.headingBackgroundImageUrl != null;
    const currentAttachment = this.headingBackgroundStyle['background-attachment'] || 'scroll';
    if (currentAttachment == 'scroll') { this.displayedBackgroundAttachment = 'Fixed'; } else { this.displayedBackgroundAttachment = 'Moving'; }
    delete this.previewStyle['background-image'];
    this.previewStyle = {...this.headingBackgroundStyle, ...this.previewStyle};
  }

  ngOnDestroy() {
    this.headingHeaderStyleSubscription.unsubscribe();
    this.headingSubheaderStyleSubscription.unsubscribe();
    this.headingStyleSubscription.unsubscribe();
    this.fontNamesSubscription.unsubscribe();
    this.fontUnitsSubscription.unsubscribe();
    this.headingTemplateSubscription.unsubscribe();
    this.defaultHeadingStyleSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
    this.subheaderConditionSubscription.unsubscribe();
    this.buttonConditionSubscription.unsubscribe();
    this.headingBackgroundImageAltSubscription.unsubscribe();
    this.headingBackgroundImageUrlSubscription.unsubscribe();
    this.headingBackgroundStyleSubscription.unsubscribe();
    this.navbarMenuOptionsSubscription.unsubscribe();
    this.headingMenuOptionSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
  }
}

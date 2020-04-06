import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveComponents, ActiveComponentsPartialSelector } from '../builder';
import { UtilService } from '../../../shared/services/util.service';
import { StorageService } from '../../../shared/services/storage.service';
import { BuilderService } from '../builder.service';
import { SimpleModalService } from 'src/app/shared/components/simple-modal/simple-modal.service';

@Injectable()
export class BuilderComponentsService {

  public static webComponents = [
    {
      'name': UtilService.toTitleCase(ActiveComponents.Navbar),
      'selector': ActiveComponentsPartialSelector.Navbar
    },
    {
      'name': UtilService.toTitleCase(ActiveComponents.Hero),
      'selector': ActiveComponentsPartialSelector.Hero
    },
    {
      'name': UtilService.toTitleCase(ActiveComponents.Footer),
      'selector': ActiveComponentsPartialSelector.Footer
    },
    {
      'name': UtilService.toTitleCase(ActiveComponents.Features),
      'selector': ActiveComponentsPartialSelector.Features
    }
  ];

  activeComponentIndex = new BehaviorSubject<number>(0);

  pageComponents = new BehaviorSubject<any>(null);

  constructor(
    private simpleModalService: SimpleModalService,
    private builderService: BuilderService
  ) {
  }

  static getComponentCleanName(componentSelectorName) {
    switch (componentSelectorName['componentName']) {
      case ActiveComponentsPartialSelector.Navbar:
        return UtilService.toTitleCase(ActiveComponents.Navbar);
      case ActiveComponentsPartialSelector.Hero:
        return UtilService.toTitleCase(ActiveComponents.Hero);
      case ActiveComponentsPartialSelector.Features:
        return UtilService.toTitleCase(ActiveComponents.Features);
      case ActiveComponentsPartialSelector.Footer:
        return UtilService.toTitleCase(ActiveComponents.Footer);
      default:
        return UtilService.toTitleCase(ActiveComponents.Placeholder);
    }
  }

  static getTargetPageComponents(pageComponents, activePageIndex) {
    for (let i = 0; i < pageComponents['pages'].length; i++) {
      if (i === activePageIndex) {
        return pageComponents['pages'][i];
      }
    }
  }

  static removePlaceholders(components) {
    const componentsArrayWithoutPlaceholders = [];
    for (let i = 0; i < components.length; i++) {
      if (components[i]['componentName'] !== ActiveComponentsPartialSelector.Placeholder) {
        componentsArrayWithoutPlaceholders.push(components[i]);
      }
    }
    return componentsArrayWithoutPlaceholders;
  }

  static addPlaceholdersOnSinglePage(components) {
    const componentsArrayWithPlaceholders = components.reduce((r, a) => r.concat(a,
      {
        componentIndex: null,
        componentName: ActiveComponentsPartialSelector.Placeholder,
        componentId: `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
        timestamp: new Date().getTime()
      }),
      [{
        componentIndex: null,
        componentName: ActiveComponentsPartialSelector.Placeholder,
        componentId: `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
        timestamp: new Date().getTime()
      }]
    );
    for (let i = 0; i < componentsArrayWithPlaceholders.length; i++) {
      componentsArrayWithPlaceholders[i]['componentIndex'] = i;
    }
    return componentsArrayWithPlaceholders;
  }

  static addPlaceholdersOnMultiplePages(components) {
    return components.map((obj) => {
      return obj.reduce((r, a) => r.concat(a,
        {
          componentIndex: null,
          componentName: ActiveComponentsPartialSelector.Placeholder,
          componentId: `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
          timestamp: new Date().getTime()
        }),
        [{
          componentIndex: null,
          componentName: ActiveComponentsPartialSelector.Placeholder,
          componentId: `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
          timestamp: new Date().getTime()
        }]
      );
    });
  }

  static getUnorderedComponentsArrayWithoutPlaceholders(e: any) {
    const tempUnorderedComponentsArrayWithoutPlaceholders = [];
    for (let i = 0; i < e.target.children.length; i++) {
      const componentName = e.target.children[i].children[0].children[0].localName;
      const componentId = e.target.children[i].children[0].children[0].id;
      const component = {
        componentName: componentName,
        componentId: componentId,
        componentIndex: null
      };
      if (component['componentName'] !== ActiveComponentsPartialSelector.Placeholder) {
        tempUnorderedComponentsArrayWithoutPlaceholders.push(component);
      }
    }
    return tempUnorderedComponentsArrayWithoutPlaceholders;
  }

  static getOrderedComponentsArrayWithPlaceholders(tempUnorderedComponentsArrayWithoutPlaceholders) {
    const tempUnorderedComponentsArrayWithPlaceholders = tempUnorderedComponentsArrayWithoutPlaceholders.reduce((r, a) => r.concat(a,
      {
        componentName: ActiveComponentsPartialSelector.Placeholder,
        componentId: `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
        componentIndex: null,
        timestamp: new Date().getTime()
      }),

      [{
        componentName: ActiveComponentsPartialSelector.Placeholder,
        componentId: `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
        componentIndex: null,
        timestamp: new Date().getTime()
      }]
    );

    const tempOrderedComponentsArrayWithPlaceholders = [];
    for (let i = 0; i < tempUnorderedComponentsArrayWithPlaceholders.length; i++) {
      const component = {
        componentName: tempUnorderedComponentsArrayWithPlaceholders[i]['componentName'],
        componentId: tempUnorderedComponentsArrayWithPlaceholders[i]['componentId'],
        componentIndex: i,
        timestamp: new Date().getTime()
      };
      tempOrderedComponentsArrayWithPlaceholders.push(component);
    }
    return tempOrderedComponentsArrayWithPlaceholders;
  }

  static setupFooterComponent(component, tempComponent) {
    if (tempComponent) {
      component['footerStyle'] = tempComponent['componentDetail']['footerStyle'];
      component['footerSocialLinksContainerStyle'] = tempComponent['componentDetail']['footerSocialLinksContainerStyle'];
      component['footerSocialLinksStyle'] = tempComponent['componentDetail']['footerSocialLinksStyle'];
      component['footerCopyrightStyle'] = tempComponent['componentDetail']['footerCopyrightStyle'];
      component['footerPageLinksStyle'] = tempComponent['componentDetail']['footerPageLinksStyle'];
      component['footerComponentLayout'] = tempComponent['componentDetail']['footerComponentLayout'];
      component['footerAlignmentClass'] = tempComponent['componentDetail']['footerAlignmentClass'];
      component['footerSocialLinks'] = tempComponent['componentDetail']['footerSocialLinks'];
      component['footerMenuOptions'] = tempComponent['componentDetail']['footerMenuOptions'];
    }
    return component;
  }

  static setupHeroComponent(component, tempComponent) {
    if (tempComponent) {
      component['heroButtonLink'] = tempComponent['componentDetail']['heroButtonLink'];
      component['heroBackgroundStyle'] = tempComponent['componentDetail']['heroBackgroundStyle'];
      component['heroHeadingStyle'] = tempComponent['componentDetail']['heroHeadingStyle'];
      component['heroSubheadingStyle'] = tempComponent['componentDetail']['heroSubheadingStyle'];
      component['heroImageStyle'] = tempComponent['componentDetail']['heroImageStyle'];
      component['heroButtonStyle'] = tempComponent['componentDetail']['heroButtonStyle'];
      component['heroComponentLayout'] = tempComponent['componentDetail']['heroComponentLayout'];
      component['heroHeadingText'] = tempComponent['componentDetail']['heroHeadingText'];
      component['heroSubheadingText'] = tempComponent['componentDetail']['heroSubheadingText'];
      component['heroHeadingText'] = tempComponent['componentDetail']['heroHeadingText'];
      component['heroSubheadingText'] = tempComponent['componentDetail']['heroSubheadingText'];
      component['heroButtonText'] = tempComponent['componentDetail']['heroButtonText'];
    }
    return component;
  }

  static setupFeaturesComponent(component, tempComponent) {
    if (tempComponent) {
      component['featuresStyle'] = tempComponent['componentDetail']['featuresStyle'];
      component['featuresHeadingStyle'] = tempComponent['componentDetail']['featuresHeadingStyle'];
      component['featuresSubheadingStyle'] = tempComponent['componentDetail']['featuresSubheadingStyle'];
    }
    component['featuresItemArray'] = [
      {
        'heading': UtilService.generateRandomWord(),
        'subheading': 'Building a website has never been easier than this! Get started today, free of cost.'
      },
      {
        'heading': UtilService.generateRandomWord(),
        'subheading': 'Make our amazing library of templates and themes your own with our extensive range of custom options.'
      },
      {
        'heading': UtilService.generateRandomWord(),
        'subheading': 'Grow with ease and whilst receiving useful analytics. Its just what you need to blossom.'
      }
    ];
    return component;
  }

  static setupNavbarComponent(component, tempComponent) {
    if (tempComponent) {
      component['navbarStyle'] = tempComponent['componentDetail']['navbarStyle'];
      component['navbarLinkStyle'] = tempComponent['componentDetail']['navbarLinkStyle'];
      component['navbarLogoImageStyle'] = tempComponent['componentDetail']['navbarLogoImageStyle'];
      component['navbarBrandStyle'] = tempComponent['componentDetail']['navbarBrandStyle'];
      component['navbarLogoText'] = tempComponent['componentDetail']['navbarLogoText'];
      component['navbarLogoImage'] = tempComponent['componentDetail']['navbarLogoImage'];
      component['navbarMenuOptions'] = tempComponent['componentDetail']['navbarMenuOptions'];
      component['navbarLayoutClass'] = tempComponent['componentDetail']['navbarLayoutClass'];
    }
    return component;
  }

  static setupComponent(componentToAdd) {
    return {
      'componentIndex': componentToAdd['componentIndex'],
      'componentId': componentToAdd['componentId'],
      'componentName': componentToAdd['componentName'],
      'timestamp': componentToAdd['timestamp']
    };
  }

  static getActivePageIndex(pageComponents, componentToAdd) {
    let activePageIndex = null;
    for (let i = 0; i < pageComponents['pages'].length; i++) {
      for (let j = 0; j < pageComponents['pages'][i]['components'].length; j++) {
        if (pageComponents['pages'][i]['components'][j]['componentId'] === componentToAdd['nearestComponentId']) {
          activePageIndex = i;
        }
      }
    }
    return activePageIndex;
  }

  static getActiveComponentIndex(pageComponents, componentToAdd) {
    let activeComponentIndex = null;
    for (let i = 0; i < pageComponents['pages'].length; i++) {
      for (let j = 0; j < pageComponents['pages'][i]['components'].length; j++) {
        if (pageComponents['pages'][i]['components'][j]['componentId'] === componentToAdd['nearestComponentId']) {
          activeComponentIndex = j;
        }
      }
    }
    return activeComponentIndex;
  }

  static deleteComponentById(components, componentId) {
    return components.filter(function (a) {
      return a['componentId'] !== componentId;
    });
  }

  static deleteComponentByIndex(components, targetComponents) {
    for (let i = 0; i < targetComponents.length; i++) {
      const activePageIndex = targetComponents[i]['activePageIndex'];
      const activeComponentIndex = targetComponents[i]['activeComponentIndex'];
      components['pages'][activePageIndex]['components'][activeComponentIndex] = null;
    }
    return components;
  }

  static isComponent(component, componentId) {
    return componentId.indexOf(component) > -1;
  }

  static deleteNullComponentsOnMultiplePages(components) {
    return components['pages'].map(obj => {
      return obj['components'].filter(item => item !== null);
    });
  }

  static updateComponents(components, pageComponents) {
    for (let i = 0; i < components.length; i++) {
      pageComponents['pages'][i]['components'] = components[i];
    }
    return pageComponents;
  }

  static addComponentsToSessionStorage(pageComponents, activePage) {
    for (let i = 0; i < pageComponents['pages'].length; i++) {
      if (pageComponents['pages'][i]['name'] === activePage) {
        StorageService.setItem('components', JSON.stringify(pageComponents['pages'][i]['components']));
      }
    }
  }

  deleteComponentByName(componentName) {
    let pageComponents = this.pageComponents.getValue();
    const targetComponents = this.getTargetComponentByName(componentName);
    const placeholderComponents = this.getTargetComponentByName(ActiveComponentsPartialSelector.Placeholder);

    pageComponents = BuilderComponentsService.deleteComponentByIndex(pageComponents, targetComponents);
    pageComponents = BuilderComponentsService.deleteComponentByIndex(pageComponents, placeholderComponents);
    pageComponents = BuilderComponentsService.deleteNullComponentsOnMultiplePages(pageComponents);
    pageComponents = BuilderComponentsService.addPlaceholdersOnMultiplePages(pageComponents);
    pageComponents.map(obj => obj.forEach((el, idx) => (el.componentIndex = idx)));

    return pageComponents;
  }

  getComponent(activePageIndex, activeComponentIndex) {
    const pageComponents = this.pageComponents.getValue();
    return pageComponents['pages'][activePageIndex]['components'][activeComponentIndex];
  }

  getActiveTargetComponentById(componentId: string) {
    let activePageIndex = null;
    let activeComponentIndex = null;
    const pageComponents = this.pageComponents.getValue();
    for (let i = 0; i < pageComponents['pages'].length; i++) {
      for (let j = 0; j < pageComponents['pages'][i]['components'].length; j++) {
        if (pageComponents['pages'][i]['components'][j]['componentId'] === componentId) {
          activePageIndex = i;
          activeComponentIndex = j;
        }
      }
    }
    return {
      'activePageIndex': activePageIndex,
      'activeComponentIndex': activeComponentIndex,
    };
  }

  getTargetComponentByName(componentName) {
    const targetComponentArray = [];
    const pageComponents = this.pageComponents.getValue();
    for (let i = 0; i < pageComponents['pages'].length; i++) {
      for (let j = 0; j < pageComponents['pages'][i]['components'].length; j++) {
        if (pageComponents['pages'][i]['components'][j]['componentName'] === componentName) {
          targetComponentArray.push({
            'activePageIndex': i,
            'activeComponentIndex': j
          });
        }
      }
    }
    return targetComponentArray;
  }

  setPageComponentsByName(component, key, value) {
    const targetComponentLocation = this.getTargetComponentByName(component);
    const pageComponents = this.pageComponents.getValue();
    const timestamp = new Date().getTime();
    for (let i = 0; i < targetComponentLocation.length; i++) {
      const activePageIndex = targetComponentLocation[i]['activePageIndex'];
      const activeComponentIndex = targetComponentLocation[i]['activeComponentIndex'];
      if (pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['style'].hasOwnProperty(key)) {
        pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['style'][key] = value;
      } else {
        pageComponents['pages'][activePageIndex]['components'][activeComponentIndex][key] = value;
      }
      pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['timestamp'] = timestamp;
    }
    this.pageComponents.next(pageComponents);
  }

  setPageComponentByIdAndKey(componentId, parentKey, childKey, value) {
    const targetComponentLocation = this.getActiveTargetComponentById(componentId);
    const pageComponents = this.pageComponents.getValue();
    const activePageIndex = targetComponentLocation['activePageIndex'];
    const activeComponentIndex = targetComponentLocation['activeComponentIndex'];
    const timestamp = new Date().getTime();
    if (pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['style'].hasOwnProperty(parentKey)) {
      pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['style'][parentKey][childKey] = value;
    } else {
      pageComponents['pages'][activePageIndex]['components'][activeComponentIndex][parentKey][childKey] = value;
    }
    pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['timestamp'] = timestamp;
    this.pageComponents.next(pageComponents);
  }

  setPageComponentsByNameAndKey(component, parentKey, childKey, value) {
    const targetComponentLocation = this.getTargetComponentByName(component);
    const pageComponents = this.pageComponents.getValue();
    const timestamp = new Date().getTime();
    for (let i = 0; i < targetComponentLocation.length; i++) {
      const activePageIndex = targetComponentLocation[i]['activePageIndex'];
      const activeComponentIndex = targetComponentLocation[i]['activeComponentIndex'];
      if (pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['style'].hasOwnProperty(parentKey)) {
        pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['style'][parentKey][childKey] = value;
      } else {
        pageComponents['pages'][activePageIndex]['components'][activeComponentIndex][parentKey][childKey] = value;
      }
      pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['timestamp'] = timestamp;
    }
    this.pageComponents.next(pageComponents);
  }

  setPageComponentById(componentId, key, value) {
    const targetComponentLocation = this.getActiveTargetComponentById(componentId);
    const pageComponents = this.pageComponents.getValue();
    const activePageIndex = targetComponentLocation['activePageIndex'];
    const activeComponentIndex = targetComponentLocation['activeComponentIndex'];
    const timestamp = new Date().getTime();
    if (pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['style'].hasOwnProperty(key)) {
      pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['style'][key] = value;
    } else {
      pageComponents['pages'][activePageIndex]['components'][activeComponentIndex][key] = value;
    }
    pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['timestamp'] = timestamp;
    this.pageComponents.next(pageComponents);
  }

  checkIfComponentExists(componentName) {
    const pageComponents = this.pageComponents.getValue();
    for (let i = 0; i < pageComponents['pages'].length; i++) {
      for (let j = 0; j < pageComponents['pages'][i]['components'].length; j++) {
        if (pageComponents['pages'][i]['components'][j]['componentName'] === componentName) {
          return true;
        }
      }
    }
    return false;
  }

  addComponent(component, activePageIndex = null) {
    const pageComponents = this.pageComponents.getValue();
    if (activePageIndex === null) {
      activePageIndex = BuilderComponentsService.getActivePageIndex(pageComponents, component);
    }
    const activeComponentIndex = BuilderComponentsService.getActiveComponentIndex(pageComponents, component);
    if (component['style']) {
      let addOptions = { multiPage: false, defaultIndex: 999 };
      if (component['componentName'] === ActiveComponentsPartialSelector.Navbar) {
        addOptions = { multiPage: true, defaultIndex: 0 };
      }
      if (component['componentName'] === ActiveComponentsPartialSelector.Footer) {
        addOptions = { multiPage: true, defaultIndex: 999 };
      }
      if (addOptions.multiPage === false) {
        this.insertComponent(activePageIndex, activeComponentIndex, component, addOptions.defaultIndex);
      }
      if (addOptions.multiPage === true) {
        if (!this.checkIfComponentExists(component['componentName'])) {
          for (let i = 0; i < pageComponents['pages'].length; i++) {
            if (i === activePageIndex) {
              this.insertComponent(i, activeComponentIndex, component);
            } else {
              this.insertComponent(i, addOptions.defaultIndex, component);
            }
          }
        } else {
          this.simpleModalService.displayMessage('Oops!', 'This component cannot be added twice to a single page.');
        }
      }
      this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
      StorageService.setItem('components', JSON.stringify(pageComponents));
    }
  }

  insertComponent(pageIndex: number, componentIndex: number, component: any, defaultComponentIndex = null) {
    const pageComponents = this.pageComponents.getValue();
    if (componentIndex === null) {
      componentIndex = defaultComponentIndex;
    }
    pageComponents['pages'][pageIndex]['components'].splice(componentIndex, 0, component);
    const componentsArrayWithoutPlaceholders = BuilderComponentsService.removePlaceholders(pageComponents['pages'][pageIndex]['components']);
    pageComponents['pages'][pageIndex]['components'] = BuilderComponentsService.addPlaceholdersOnSinglePage(componentsArrayWithoutPlaceholders);
    this.pageComponents.next(pageComponents);
  }

  renamePage(newPageName, oldPageName) {
    const pageComponents = this.pageComponents.getValue();
    for (let i = 0; i < pageComponents['pages'].length; i++) {
      if (pageComponents['pages'][i]['name'] === oldPageName) {
        pageComponents['pages'][i]['name'] = newPageName;
      }
    }
    this.pageComponents.next(pageComponents);
  }

  deletePage(pageName) {
    const pageComponents = this.pageComponents.getValue();
    for (let i = 0; i < pageComponents['pages'].length; i++) {
      if (pageComponents['pages'][i]['name'] === pageName) {
        pageComponents['pages'].splice(i, 1);
      }
    }
    this.pageComponents.next(pageComponents);
  }

  getPageIndex(pageName) {
    const pageComponents = this.pageComponents.getValue();
    for (let i = 0; i < pageComponents['pages'].length; i++) {
      if (pageComponents['pages'][i]['name'] === pageName) {
        return i;
      }
    }
  }
}

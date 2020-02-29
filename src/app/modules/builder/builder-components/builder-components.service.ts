import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveComponents, ActiveComponentsPartialSelector, ActiveTemplates, ActiveThemes } from '../builder';
import { UtilService } from '../../../shared/services/util.service';

@Injectable()
export class BuilderComponentsService {
  pageComponents = new BehaviorSubject<any>(null);
  defaultPageComponents = new BehaviorSubject<any>({
    'template': ActiveTemplates.Default,
    'pages': [
      {
        'name': 'Home',
        'components': [
          {
            'componentIndex': 0,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 1,
            'componentId': `${ActiveComponents.Navbar}-${UtilService.generateRandomString(8)}`,
            'componentName': `${ActiveComponentsPartialSelector.Navbar}`,
            'timestamp': new Date().getTime(),
            'navbarStyle': {
              'background-color': '#FFFFFF',
              'padding': '24px'
            },
            'navbarLinkStyle': {
              'color': '#000',
              'padding-top': '4px',
              'padding-left': '4px',
              'padding-right': '4px',
              'padding-bottom': '4px',
              'font-family': 'Avenir Next Regular, sans-serif',
              'font-size': '15px'
            },
            'navbarBrandStyle': {
              'color': '#757575',
              'padding-top': '0px',
              'padding-left': '0px',
              'padding-right': '0px',
              'padding-bottom': '0px',
              'font-family': 'Avenir Next Regular, sans-serif',
              'font-size': '17px',
              'width': '100px'
            },
            'navbarLogoImageStyle': {
              'padding-top': '4px',
              'padding-left': '4px',
              'padding-right': '4px',
              'padding-bottom': '4px',
              'width': '100px',
            },
            'navbarLayoutClass': 'navbar-nav ml-auto',
            'navbarLogoText': 'Logo',
            'navbarLogoImage': '../assets/img/default-logo.svg',
            'navbarMenuOptions': ['Home', 'About'],
            'navbarTheme': ActiveThemes.Default,
            'navbarTemplate': ActiveTemplates.Default,
          },
          {
            'componentIndex': 2,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 3,
            'componentId': `${ActiveComponents.Hero}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Hero,
            'heroTheme': ActiveThemes.Default,
            'heroTemplate': ActiveTemplates.Default,
            'timestamp': new Date().getTime(),
            'heroButtonLink': 'About',
            'heroBackgroundStyle': {
              'background-color': '#FFFFFF'
            },
            'heroHeadingStyle': {
              'font-family': 'Avenir Next Medium, sans-serif',
              'color': '#323D47',
              'font-size': '48px',
              'padding-top': '0px',
              'padding-left': '0px',
              'padding-right': '0px',
              'padding-bottom': '0px',
              'line-height': '60px'
            },
            'heroSubheadingStyle': {
              'font-family': 'Avenir Next Regular, sans-serif',
              'color': '#757575',
              'line-height': '34px',
              'font-size': '20px',
              'padding-top': '0px',
              'padding-left': '0px',
              'padding-right': '0px',
              'padding-bottom': '0px'
            },
            'heroImageStyle': {
              'width': '100%',
              'src': '../assets/img/default-hero.svg',
              'alt': 'default-hero.svg',
              'padding-top': '0px',
              'padding-left': '0px',
              'padding-right': '0px',
              'padding-bottom': '0px'
            },
            'heroButtonStyle': {
              'font-family': 'Avenir Next Regular, sans-serif',
              'background-color': '#0C66FF',
              'border-color': '#0C66FF',
              'color': '#FFFFFF',
              'font-size': '12px',
              'padding-top': '8px',
              'padding-left': '26px',
              'padding-right': '26px',
              'padding-bottom': '8px'
            },
            'heroComponentLayout': {
              'layout': 0
            },
          },
          {
            'componentIndex': 4,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 5,
            'componentId': `${ActiveComponents.Features}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Features,
            'timestamp': new Date().getTime(),
            'featuresStyle': {
              'background-color': '#FFFFFF',
              'padding-left': '10px',
              'padding-bottom': '14px',
              'padding-top': '14px',
              'padding-right': '10px',
              'width': '33.3%'
            },
            'featuresHeadingStyle': {
              'font-family': 'Avenir Next Regular, sans-serif',
              'font-size': '20px',
              'font-weight': 'bold',
              'color': '#000',
              'padding-left': '10px',
              'padding-bottom': '5px',
              'margin-bottom': '5px',
              'padding-top': '0px',
              'padding-right': '10px'
            },
            'featuresSubheadingStyle': {
              'font-family': 'Avenir Next Regular, sans-serif',
              'font-size': '13px',
              'color': '#757575',
              'padding-left': '10px',
              'padding-bottom': '0px',
              'padding-top': '0px',
              'padding-right': '10px'
            },
            'featuresItemArray': [
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
            ],
            'featuresTheme': ActiveThemes.Default,
            'featuresTemplate': ActiveTemplates.Default
          },
          {
            'componentIndex': 6,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime(),
          },
          {
            'componentIndex': 7,
            'componentId': `${ActiveComponents.Features}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Features,
            'timestamp': new Date().getTime(),
            'featuresStyle': {
              'background-color': '#FFFFFF',
              'padding-left': '10px',
              'padding-bottom': '14px',
              'padding-top': '14px',
              'padding-right': '10px',
              'width': '33.3%'
            },
            'featuresHeadingStyle': {
              'font-family': 'Avenir Next Regular, sans-serif',
              'font-size': '20px',
              'font-weight': 'bold',
              'color': '#000',
              'padding-left': '10px',
              'padding-bottom': '5px',
              'margin-bottom': '5px',
              'padding-top': '0px',
              'padding-right': '10px'
            },
            'featuresSubheadingStyle': {
              'font-family': 'Avenir Next Regular, sans-serif',
              'font-size': '13px',
              'color': '#757575',
              'padding-left': '10px',
              'padding-bottom': '0px',
              'padding-top': '0px',
              'padding-right': '10px'
            },
            'featuresItemArray': [
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
            ],
            'featuresTheme': ActiveThemes.Default,
            'featuresTemplate': ActiveTemplates.Default
          },
          {
            'componentIndex': 8,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 9,
            'componentId': `${ActiveComponents.Footer}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Footer,
            'footerTheme': ActiveThemes.Default,
            'footerTemplate': ActiveTemplates.Default,
            'timestamp': new Date().getTime(),
            'footerStyle': {
              'color': '#757575',
              'padding-top': '16px',
              'padding-left': '32px',
              'padding-right': '32px',
              'padding-bottom': '16px',
              'display': 'block',
              'background-color': '#FFFFFF'
            },
            'footerSocialLinksContainerStyle': {
              'margin-left': '0px'
            },
            'footerSocialLinksStyle': {
              'font-family': 'Avenir Next Regular, sans-serif',
              'font-size': '14px',
              'margin-right': '4px',
              'margin-bottom': '4px',
              'margin-top': '0px',
              'margin-left': '0px'
            },
            'footerPageLinksStyle': {
              'font-family': 'Avenir Next Regular, sans-serif',
              'font-size': '14px',
              'padding-left': '0px',
              'padding-bottom': '16px',
              'padding-top': '4px',
              'padding-right': '16px'
            },
            'footerCopyrightStyle': {
              'font-family': 'Avenir Next Regular, sans-serif',
              'padding-top': '12px',
              'font-size': '14px',
              'padding-left': '0px',
              'padding-bottom': '0px',
              'padding-right': '0px'
            },
            'footerAlignmentClass': 'text-center',
            'footerComponentLayout': {
              'layout': 0
            },
            'footerSocialLinks': {
              'facebookUrl': null,
              'twitterUrl': null,
              'instagramUrl': null,
              'youtubeUrl': null,
              'githubUrl': null,
              'linkedinUrl': null,
            }
          },
          {
            'componentIndex': 10,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
        ]
      },
      {
        'name': 'About',
        'components': [
          {
            'componentIndex': 0,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 1,
            'componentId': `${ActiveComponents.Navbar}-${UtilService.generateRandomString(8)}`,
            'componentName': `${ActiveComponentsPartialSelector.Navbar}`,
            'timestamp': new Date().getTime(),
            'navbarStyle': {
              'background-color': '#FFFFFF',
              'padding': '24px'
            },
            'navbarLinkStyle': {
              'color': '#000',
              'padding-top': '4px',
              'padding-left': '4px',
              'padding-right': '4px',
              'padding-bottom': '4px',
              'font-family': 'Avenir Next Regular, sans-serif',
              'font-size': '15px'
            },
            'navbarBrandStyle': {
              'color': '#757575',
              'padding-top': '0px',
              'padding-left': '0px',
              'padding-right': '0px',
              'padding-bottom': '0px',
              'font-family': 'Avenir Next Regular, sans-serif',
              'font-size': '17px',
              'width': '100px'
            },
            'navbarLogoImageStyle': {
              'padding-top': '4px',
              'padding-left': '4px',
              'padding-right': '4px',
              'padding-bottom': '4px',
              'width': '100px',
              'font-family': 'Avenir Next Regular, sans-serif',
            },
            'navbarLayoutClass': 'navbar-nav ml-auto',
            'navbarLogoText': 'Logo',
            'navbarLogoImage': '../assets/img/default-logo.svg',
            'navbarMenuOptions': ['Home', 'About'],
            'navbarTheme': ActiveThemes.Default,
            'navbarTemplate': ActiveTemplates.Default,
          },
          {
            'componentIndex': 2,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 3,
            'componentId': `${ActiveComponents.Footer}-${UtilService.generateRandomString(8)}`,
            'footerTheme': ActiveThemes.Default,
            'footerTemplate': ActiveTemplates.Default,
            'componentName': ActiveComponentsPartialSelector.Footer,
            'timestamp': new Date().getTime(),
            'footerStyle': {
              'color': '#757575',
              'padding-top': '16px',
              'padding-left': '32px',
              'padding-right': '32px',
              'padding-bottom': '16px',
              'display': 'block',
              'background-color': '#FFFFFF'
            },
            'footerSocialLinksContainerStyle': {
              'margin-left': '0px'
            },
            'footerSocialLinksStyle': {
              'font-family': 'Avenir Next Regular, sans-serif',
              'font-size': '14px',
              'margin-right': '4px',
              'margin-bottom': '4px',
              'margin-top': '0px',
              'margin-left': '0px'
            },
            'footerPageLinksStyle': {
              'font-family': 'Avenir Next Regular, sans-serif',
              'font-size': '14px',
              'padding-left': '0px',
              'padding-bottom': '16px',
              'padding-top': '4px',
              'padding-right': '16px'
            },
            'footerCopyrightStyle': {
              'font-family': 'Avenir Next Regular, sans-serif',
              'padding-top': '12px',
              'font-size': '14px',
              'padding-left': '0px',
              'padding-bottom': '0px',
              'padding-right': '0px'
            },
            'footerAlignmentClass': 'text-center',
            'footerComponentLayout': {
              'layout': 0
            },
            'footerSocialLinks': {
              'facebookUrl': null,
              'twitterUrl': null,
              'instagramUrl': null,
              'youtubeUrl': null,
              'githubUrl': null,
              'linkedinUrl': null,
            }
          },
          {
            'componentIndex': 4,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
        ]
      }
    ]
  });
  frontPageComponents = new BehaviorSubject<any>({
    'template': ActiveTemplates.Front,
    'pages': [
      {
        'name': 'Home',
        'components': [
          {
            'componentIndex': 0,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 1,
            'componentId': `${ActiveComponents.Navbar}-${UtilService.generateRandomString(8)}`,
            'componentName': `${ActiveComponentsPartialSelector.Navbar}`,
            'timestamp': new Date().getTime(),
            'navbarStyle': {
              'background-color': '#FFFFFF',
              'display': 'flex',
              'font-family': 'Poppins, sans-serif',
              'padding': '2em'
            },
            'navbarLinkStyle': {
              'color': 'rgb(119, 131, 143)',
              'padding-bottom': '24px',
              'padding-left': '14px',
              'padding-right': '14px',
              'padding-top': '24px',
              'font-size': '16px',
              'font-weight': '400',
              'line-height': '24px',
              'font-family': 'Poppins, sans-serif',
              'display': 'block'
            },
            'navbarBrandStyle': {
              'color': '#377DFF',
              'margin-right': '1rem',
              'font-size': '20px',
              'line-height': 'inherit',
              'white-space': 'nowrap',
              'padding-top': '0px',
              'padding-left': '0px',
              'padding-right': '0px',
              'padding-bottom': '0px',
              'font-family': 'Poppins, sans-serif',
              'width': '100px'
            },
            'navbarLogoImageStyle': {
              'height': '55px',
              'padding-top': '4px',
              'padding-left': '4px',
              'padding-right': '4px',
              'padding-bottom': '4px',
              'width': '100px'
            },
            'navbarLayoutClass': 'navbar-nav ml-auto',
            'navbarLogoText': 'Logo',
            'navbarLogoImage': '../assets/img/default-logo.svg',
            'navbarMenuOptions': ['Home', 'About'],
            'navbarTheme': ActiveThemes.Default,
            'navbarTemplate': ActiveTemplates.Front
          },
          {
            'componentIndex': 2,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 3,
            'componentId': `${ActiveComponents.Hero}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Hero,
            'heroTheme': ActiveThemes.Default,
            'heroTemplate': ActiveTemplates.Front,
            'timestamp': new Date().getTime(),
            'heroButtonLink': 'About',
            'heroBackgroundStyle': {
              'background-color': '#FFFFFF'
            },
            'heroHeadingStyle': {
              'font-family': 'Poppins, sans-serif',
              'color': '#1e2022',
              'font-weight': '300',
              'line-height': '1.2',
              'font-size': '3.5rem'
            },
            'heroSubheadingStyle': {
              'font-family': 'Poppins, sans-serif',
              'color': '#757575',
              'line-height': '34px',
              'font-weight': '300',
              'font-size': '20px'
            },
            'heroImageStyle': {
              'width': '100%',
              'src': '../assets/img/business-2-hero.svg',
              'alt': 'business-2-hero.svg',
              'padding-top': '0px',
              'padding-left': '0px',
              'padding-right': '0px',
              'padding-bottom': '0px'
            },
            'heroButtonStyle': {
              'color': '#377dff',
              'font-family': 'Poppins, sans-serif',
              'min-width': '9.6875rem',
              'background': 'rgba(55, 125, 255, 0.1)',
              'border-color': 'transparent',
              'text-transform': 'none',
              'text-align': 'center',
              'font-size': '16px',
              'font-weight': '500',
              'border-radius': '0.3125rem'
            },
            'heroComponentLayout': {
              'layout': 0
            },
          },
          {
            'componentIndex': 4,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 5,
            'componentId': `${ActiveComponents.Features}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Features,
            'timestamp': new Date().getTime(),
            'featuresStyle': {
              'background-color': '#FFFFFF',
              'padding-left': '10px',
              'padding-bottom': '14px',
              'padding-top': '14px',
              'padding-right': '10px',
              'width': '33.3%'
            },
            'featuresHeadingStyle': {
              'font-family': 'Poppins, sans-serif',
              'font-size': '20px',
              'font-weight': 'bold',
              'color': '#000',
              'padding-left': '10px',
              'padding-bottom': '5px',
              'margin-bottom': '5px',
              'padding-top': '0px',
              'padding-right': '10px'
            },
            'featuresSubheadingStyle': {
              'font-family': 'Poppins, sans-serif',
              'font-size': '13px',
              'color': '#757575',
              'padding-left': '10px',
              'padding-bottom': '0px',
              'padding-top': '0px',
              'padding-right': '10px'
            },
            'featuresItemArray': [
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
            ],
            'featuresTheme': ActiveThemes.Default,
            'featuresTemplate': ActiveTemplates.Front
          },
          {
            'componentIndex': 6,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime(),
          },
          {
            'componentIndex': 7,
            'componentId': `${ActiveComponents.Features}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Features,
            'timestamp': new Date().getTime(),
            'featuresStyle': {
              'background-color': '#FFFFFF',
              'padding-left': '10px',
              'padding-bottom': '14px',
              'padding-top': '14px',
              'padding-right': '10px',
              'width': '33.3%'
            },
            'featuresHeadingStyle': {
              'font-family': 'Poppins, sans-serif',
              'font-size': '20px',
              'font-weight': 'bold',
              'color': '#000',
              'padding-left': '10px',
              'padding-bottom': '5px',
              'margin-bottom': '5px',
              'padding-top': '0px',
              'padding-right': '10px'
            },
            'featuresSubheadingStyle': {
              'font-family': 'Poppins, sans-serif',
              'font-size': '13px',
              'color': '#757575',
              'padding-left': '10px',
              'padding-bottom': '0px',
              'padding-top': '0px',
              'padding-right': '10px'
            },
            'featuresItemArray': [
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
            ],
            'featuresTheme': ActiveThemes.Default,
            'featuresTemplate': ActiveTemplates.Default
          },
          {
            'componentIndex': 8,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 9,
            'componentId': `${ActiveComponents.Footer}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Footer,
            'timestamp': new Date().getTime(),
            'footerStyle': {
              'color': '#757575',
              'padding-top': '16px',
              'padding-left': '32px',
              'padding-right': '32px',
              'padding-bottom': '16px',
              'display': 'block',
              'background-color': '#FFFFFF'
            },
            'footerSocialLinksContainerStyle': {
              'margin-left': '0px'
            },
            'footerSocialLinksStyle': {
              'font-family': 'Poppins, sans-serif',
              'font-size': '14px',
              'margin-right': '4px',
              'margin-bottom': '4px',
              'margin-top': '0px',
              'margin-left': '0px'
            },
            'footerPageLinksStyle': {
              'font-family': 'Poppins, sans-serif',
              'font-size': '14px',
              'padding-left': '0px',
              'padding-bottom': '16px',
              'padding-top': '4px',
              'padding-right': '16px'
            },
            'footerCopyrightStyle': {
              'font-family': 'Poppins, sans-serif',
              'padding-top': '12px',
              'font-size': '14px',
              'padding-left': '0px',
              'padding-bottom': '0px',
              'padding-right': '0px'
            },
            'footerAlignmentClass': 'text-center',
            'footerComponentLayout': {
              'layout': 0
            },
            'footerSocialLinks': {
              'facebookUrl': null,
              'twitterUrl': null,
              'instagramUrl': null,
              'youtubeUrl': null,
              'githubUrl': null,
              'linkedinUrl': null,
            },
            'footerTheme': ActiveThemes.Default,
            'footerTemplate': ActiveTemplates.Front
          },
          {
            'componentIndex': 10,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
        ]
      },
      {
        'name': 'About',
        'components': [
          {
            'componentIndex': 0,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 1,
            'componentId': `${ActiveComponents.Navbar}-${UtilService.generateRandomString(8)}`,
            'componentName': `${ActiveComponentsPartialSelector.Navbar}`,
            'timestamp': new Date().getTime(),
            'navbarStyle': {
              'background-color': '#FFFFFF',
              'display': 'flex',
              'font-family': 'Poppins, sans-serif',
              'padding': '2em'
            },
            'navbarLinkStyle': {
              'color': 'rgb(119, 131, 143)',
              'padding-bottom': '24px',
              'padding-left': '14px',
              'padding-right': '14px',
              'padding-top': '24px',
              'font-size': '16px',
              'font-weight': '400',
              'line-height': '24px',
              'font-family': 'Poppins, sans-serif',
              'display': 'block'
            },
            'navbarBrandStyle': {
              'color': '#377DFF',
              'margin-right': '1rem',
              'font-size': '20px',
              'line-height': 'inherit',
              'white-space': 'nowrap',
              'padding-top': '0px',
              'padding-left': '0px',
              'padding-right': '0px',
              'padding-bottom': '0px',
              'font-family': 'Poppins, sans-serif',
              'width': '100px'
            },
            'navbarLogoImageStyle': {
              'height': '55px',
              'padding-top': '4px',
              'padding-left': '4px',
              'padding-right': '4px',
              'padding-bottom': '4px',
              'width': '100px'
            },
            'navbarLayoutClass': 'navbar-nav ml-auto',
            'navbarLogoText': 'Logo',
            'navbarLogoImage': '../assets/img/default-logo.svg',
            'navbarMenuOptions': ['Home', 'About'],
            'navbarTheme': ActiveThemes.Default,
            'navbarTemplate': ActiveTemplates.Front,
          },
          {
            'componentIndex': 2,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 3,
            'componentId': `${ActiveComponents.Footer}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Footer,
            'timestamp': new Date().getTime(),
            'footerStyle': {
              'padding-top': '16px',
              'padding-left': '16px',
              'padding-right': '16px',
              'padding-bottom': '16px',
              'display': 'block',
              'background-color': '#FFFFFF',
              'color': '#8c98a4'
            },
            'footerSocialLinksContainerStyle': {
              'margin-left': '0px'
            },
            'footerSocialLinksStyle': {
              'font-family': 'Poppins, sans-serif',
              'font-size': '14px',
              'margin-right': '4px',
              'margin-bottom': '4px',
              'margin-top': '0px',
              'margin-left': '0px'
            },
            'footerPageLinksStyle': {
              'font-family': 'Poppins, sans-serif',
              'font-size': '14px',
              'padding-left': '0px',
              'padding-bottom': '16px',
              'padding-top': '4px',
              'padding-right': '16px'
            },
            'footerCopyrightStyle': {
              'font-family': 'Poppins, sans-serif',
              'padding-top': '12px',
              'font-size': '14px',
              'padding-left': '0px',
              'padding-bottom': '0px',
              'padding-right': '0px'
            },
            'footerAlignmentClass': 'text-center',
            'footerComponentLayout': {
              'layout': 0
            },
            'footerSocialLinks': {
              'facebookUrl': null,
              'twitterUrl': null,
              'instagramUrl': null,
              'youtubeUrl': null,
              'githubUrl': null,
              'linkedinUrl': null,
            },
            'footerTheme': ActiveThemes.Default,
            'footerTemplate': ActiveTemplates.Front
          },
          {
            'componentIndex': 4,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
        ]
      }
    ]
  });
  quickPageComponents = new BehaviorSubject<any>({
    'template': ActiveTemplates.Quick,
    'pages': [
      {
        'name': 'Home',
        'components': [
          {
            'componentIndex': 0,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 1,
            'componentId': `${ActiveComponents.Navbar}-${UtilService.generateRandomString(8)}`,
            'componentName': `${ActiveComponentsPartialSelector.Navbar}`,
            'timestamp': new Date().getTime(),
            'navbarStyle': {
              'background-color': '#FFFFFF',
              'display': 'flex',
              'font-family': 'Nunito Sans, sans-serif',
              'padding': '2em'
            },
            'navbarLinkStyle': {
              'color': 'rgba(31,45,61,.7)',
              'padding-top': '4px',
              'padding-left': '4px',
              'padding-right': '4px',
              'padding-bottom': '4px',
              'font-size': '16px',
              'font-weight': '600',
              'line-height': '27.2px',
              'font-family': 'Nunito Sans, sans-serif',
              'display': 'block'
            },
            'navbarBrandStyle': {
              'color': '#0c66ff',
              'font-size': '20px',
              'display': 'inline-block',
              'padding-top': '0px',
              'padding-left': '0px',
              'padding-right': '0px',
              'padding-bottom': '0px',
              'font-family': 'Nunito Sans, sans-serif',
              'width': '100px'
            },
            'navbarLogoImageStyle': {
              'height': '55px',
              'padding-top': '4px',
              'padding-left': '4px',
              'padding-right': '4px',
              'padding-bottom': '4px',
              'width': '100px'
            },
            'navbarLayoutClass': 'navbar-nav ml-auto',
            'navbarLogoText': 'Logo',
            'navbarLogoImage': '../assets/img/default-logo.svg',
            'navbarMenuOptions': ['Home', 'About'],
            'navbarTheme': ActiveThemes.Default,
            'navbarTemplate': ActiveTemplates.Quick
          },
          {
            'componentIndex': 2,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 3,
            'componentId': `${ActiveComponents.Hero}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Hero,
            'timestamp': new Date().getTime(),
            'heroTheme': ActiveThemes.Default,
            'heroTemplate': ActiveTemplates.Quick,
            'heroButtonLink': 'About',
            'heroBackgroundStyle': {
              'background-color': '#FFFFFF'
            },
            'heroHeadingStyle': {
              'font-family': 'Nunito Sans, sans-serif',
              'color': '#323D47',
              'font-size': '48px',
              'padding-top': '0px',
              'padding-left': '0px',
              'padding-right': '0px',
              'padding-bottom': '0px',
              'line-height': '60px'
            },
            'heroSubheadingStyle': {
              'font-family': 'Nunito Sans, sans-serif',
              'color': '#757575',
              'line-height': '34px',
              'font-size': '20px',
              'padding-top': '0px',
              'padding-left': '0px',
              'padding-right': '0px',
              'padding-bottom': '0px'
            },
            'heroImageStyle': {
              'width': '100%',
              'src': '../assets/img/business-1-hero.svg',
              'alt': 'business-1-hero.svg',
              'padding-top': '0px',
              'padding-left': '0px',
              'padding-right': '0px',
              'padding-bottom': '0px'
            },
            'heroButtonStyle': {
              'font-family': 'Nunito Sans, sans-serif',
              'font-size': '16px',
              'box-shadow': 'inset 0 1px 0 rgba(255,255,255,.15)',
              'font-weight': '600',
              'color': '#273444',
              'background-color': '#ffbe3d',
              'border-color': '#ffbe3d',
              'text-transform': 'none'
            },
            'heroComponentLayout': {
              'layout': 0
            },
          },
          {
            'componentIndex': 4,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 5,
            'componentId': `${ActiveComponents.Features}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Features,
            'timestamp': new Date().getTime(),
            'featuresStyle': {
              'background-color': '#FFFFFF',
              'padding-left': '10px',
              'padding-bottom': '14px',
              'padding-top': '14px',
              'padding-right': '10px',
              'width': '33.3%'
            },
            'featuresHeadingStyle': {
              'font-family': 'Nunito Sans, sans-serif',
              'font-size': '20px',
              'font-weight': 'bold',
              'color': '#000',
              'padding-left': '10px',
              'padding-bottom': '5px',
              'margin-bottom': '5px',
              'padding-top': '0px',
              'padding-right': '10px'
            },
            'featuresSubheadingStyle': {
              'font-family': 'Nunito Sans, sans-serif',
              'font-size': '13px',
              'color': '#757575',
              'padding-left': '10px',
              'padding-bottom': '0px',
              'padding-top': '0px',
              'padding-right': '10px'
            },
            'featuresItemArray': [
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
            ],
            'featuresTheme': ActiveThemes.Default,
            'featuresTemplate': ActiveTemplates.Quick
          },
          {
            'componentIndex': 6,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime(),
          },
          {
            'componentIndex': 7,
            'componentId': `${ActiveComponents.Features}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Features,
            'timestamp': new Date().getTime(),
            'featuresStyle': {
              'background-color': '#FFFFFF',
              'padding-left': '10px',
              'padding-bottom': '14px',
              'padding-top': '14px',
              'padding-right': '10px',
              'width': '33.3%'
            },
            'featuresHeadingStyle': {
              'font-family': 'Nunito Sans, sans-serif',
              'font-size': '20px',
              'font-weight': 'bold',
              'color': '#000',
              'padding-left': '10px',
              'padding-bottom': '5px',
              'margin-bottom': '5px',
              'padding-top': '0px',
              'padding-right': '10px'
            },
            'featuresSubheadingStyle': {
              'font-family': 'Nunito Sans, sans-serif',
              'font-size': '13px',
              'color': '#757575',
              'padding-left': '10px',
              'padding-bottom': '0px',
              'padding-top': '0px',
              'padding-right': '10px'
            },
            'featuresItemArray': [
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
            ],
            'featuresTheme': ActiveThemes.Default,
            'featuresTemplate': ActiveTemplates.Quick
          },
          {
            'componentIndex': 8,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 9,
            'componentId': `${ActiveComponents.Footer}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Footer,
            'footerTheme': ActiveThemes.Default,
            'footerTemplate': ActiveTemplates.Quick,
            'timestamp': new Date().getTime(),
            'footerStyle': {
              'font-family': 'Nunito Sans, sans-serif',
              'color': '#757575',
              'padding-top': '16px',
              'padding-left': '16px',
              'padding-right': '16px',
              'padding-bottom': '16px',
              'background-color': '#FFFFFF'
            },
            'footerSocialLinksContainerStyle': {
              'margin-left': '0px'
            },
            'footerSocialLinksStyle': {
              'font-family': 'Nunito Sans, sans-serif',
              'font-size': '14px',
              'margin-right': '4px',
              'margin-bottom': '4px',
              'margin-top': '0px',
              'margin-left': '0px'
            },
            'footerPageLinksStyle': {
              'font-family': 'Nunito Sans, sans-serif',
              'font-size': '14px',
              'padding-left': '0px',
              'padding-bottom': '16px',
              'padding-top': '4px',
              'padding-right': '16px'
            },
            'footerCopyrightStyle': {
              'font-family': 'Nunito Sans, sans-serif',
              'padding-top': '12px',
              'font-size': '14px',
              'padding-left': '0px',
              'padding-bottom': '0px',
              'padding-right': '0px'
            },
            'footerAlignmentClass': 'text-center',
            'footerComponentLayout': {
              'layout': 0
            },
            'footerSocialLinks': {
              'facebookUrl': null,
              'twitterUrl': null,
              'instagramUrl': null,
              'youtubeUrl': null,
              'githubUrl': null,
              'linkedinUrl': null,
            }
          },
          {
            'componentIndex': 10,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
        ]
      },
      {
        'name': 'About',
        'components': [
          {
            'componentIndex': 0,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 1,
            'componentId': `${ActiveComponents.Navbar}-${UtilService.generateRandomString(8)}`,
            'componentName': `${ActiveComponentsPartialSelector.Navbar}`,
            'timestamp': new Date().getTime(),
            'navbarStyle': {
              'background-color': '#FFFFFF',
              'display': 'flex',
              'font-family': 'Nunito Sans, sans-serif',
              'padding': '2em'
            },
            'navbarLinkStyle': {
              'color': 'rgba(31,45,61,.7)',
              'padding-top': '4px',
              'padding-left': '4px',
              'padding-right': '4px',
              'padding-bottom': '4px',
              'font-size': '16px',
              'font-weight': '600',
              'line-height': '27.2px',
              'font-family': 'Nunito Sans, sans-serif',
              'display': 'block'
            },
            'navbarBrandStyle': {
              'color': '#0c66ff',
              'font-size': '20px',
              'display': 'inline-block',
              'padding-top': '0px',
              'padding-left': '0px',
              'padding-right': '0px',
              'padding-bottom': '0px',
              'font-family': 'Nunito Sans, sans-serif',
              'width': '100px'
            },
            'navbarLogoImageStyle': {
              'height': '55px',
              'padding-top': '4px',
              'padding-left': '4px',
              'padding-right': '4px',
              'padding-bottom': '4px',
              'width': '100px'
            },
            'navbarLayoutClass': 'navbar-nav ml-auto',
            'navbarLogoText': 'Logo',
            'navbarLogoImage': '../assets/img/default-logo.svg',
            'navbarMenuOptions': ['Home', 'About'],
            'navbarTheme': ActiveThemes.Default,
            'navbarTemplate': ActiveTemplates.Quick,
          },
          {
            'componentIndex': 2,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
          {
            'componentIndex': 3,
            'componentId': `${ActiveComponents.Footer}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Footer,
            'timestamp': new Date().getTime(),
            'footerTheme': ActiveThemes.Default,
            'footerTemplate': ActiveTemplates.Quick,
            'footerStyle': {
              'font-family': 'Nunito Sans, sans-serif',
              'color': '#757575',
              'padding-top': '16px',
              'padding-left': '16px',
              'padding-right': '16px',
              'padding-bottom': '16px',
              'background-color': '#FFFFFF'
            },
            'footerSocialLinksContainerStyle': {
              'margin-left': '0px'
            },
            'footerSocialLinksStyle': {
              'font-family': 'Nunito Sans, sans-serif',
              'font-size': '14px',
              'margin-right': '4px',
              'margin-bottom': '4px',
              'margin-top': '0px',
              'margin-left': '0px'
            },
            'footerPageLinksStyle': {
              'font-family': 'Nunito Sans, sans-serif',
              'font-size': '14px',
              'padding-left': '0px',
              'padding-bottom': '16px',
              'padding-top': '4px',
              'padding-right': '16px'
            },
            'footerCopyrightStyle': {
              'font-family': 'Nunito Sans, sans-serif',
              'padding-top': '12px',
              'font-size': '14px',
              'padding-left': '0px',
              'padding-bottom': '0px',
              'padding-right': '0px'
            },
            'footerAlignmentClass': 'text-center',
            'footerComponentLayout': {
              'layout': 0
            },
            'footerSocialLinks': {
              'facebookUrl': null,
              'twitterUrl': null,
              'instagramUrl': null,
              'youtubeUrl': null,
              'githubUrl': null,
              'linkedinUrl': null,
            }
          },
          {
            'componentIndex': 4,
            'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
            'componentName': ActiveComponentsPartialSelector.Placeholder,
            'timestamp': new Date().getTime()
          },
        ]
      }
    ]
  });

  activeComponentIndex = new BehaviorSubject<number>(0);

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
    for (let i = 0; i < targetComponentLocation.length; i++) {
      const activePageIndex = targetComponentLocation[i]['activePageIndex'];
      const activeComponentIndex = targetComponentLocation[i]['activeComponentIndex'];
      pageComponents['pages'][activePageIndex]['components'][activeComponentIndex][key] = value;
    }
    this.pageComponents.next(pageComponents);
  }

  setPageComponentById(component, key, value) {
    const targetComponentLocation = this.getActiveTargetComponentById(component);
    const pageComponents = this.pageComponents.getValue();
    const activePageIndex = targetComponentLocation['activePageIndex'];
    const activeComponentIndex = targetComponentLocation['activeComponentIndex'];
    pageComponents['pages'][activePageIndex]['components'][activeComponentIndex][key] = value;
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

  addComponent(component, activePageIndex) {
    switch (component['componentName']) {
      case ActiveComponentsPartialSelector.Navbar:
        this.addNavbarComponent(component, activePageIndex);
        break;
      case ActiveComponentsPartialSelector.Hero:
        this.addHeroComponent(component, activePageIndex);
        break;
      case ActiveComponentsPartialSelector.Features:
        this.addFeaturesComponent(component, activePageIndex);
        break;
      case ActiveComponentsPartialSelector.Footer:
        this.addFooterComponent(component, activePageIndex);
        break;
    }
  }

  addNavbarComponent(component, activePageIndex) {
    const pageComponents = BuilderComponentsService.getTargetPageComponents(this.pageComponents.getValue(), activePageIndex);
    component['navbarTemplate'] = pageComponents['template'];
    component['navbarTheme'] = ActiveThemes.Default;
    if (!this.checkIfComponentExists(ActiveComponentsPartialSelector.Navbar)) {
    }
  }

  addHeroComponent(component, activePageIndex) {
    const pageComponents = BuilderComponentsService.getTargetPageComponents(this.pageComponents.getValue(), activePageIndex);
    component['heroTemplate'] = pageComponents['template'];
    component['heroTheme'] = ActiveThemes.Default;
    if (!this.checkIfComponentExists(ActiveComponentsPartialSelector.Hero)) {
    }
  }

  addFeaturesComponent(component, activePageIndex) {
    const pageComponents = BuilderComponentsService.getTargetPageComponents(this.pageComponents.getValue(), activePageIndex);
    component['featuresTemplate'] = pageComponents['template'];
    component['featuresTheme'] = ActiveThemes.Default;
  }

  addFooterComponent(component, activePageIndex) {
    const pageComponents = BuilderComponentsService.getTargetPageComponents(this.pageComponents.getValue(), activePageIndex);
    component['footerTemplate'] = pageComponents['template'];
    component['footerTheme'] = ActiveThemes.Default;
    if (!this.checkIfComponentExists(ActiveComponentsPartialSelector.Footer)) {
    }
  }
}

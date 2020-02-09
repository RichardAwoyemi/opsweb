export enum ActiveSettings {
  Templates = 'templates',
  Components = 'components',
  Colours = 'colours',
  Layout = 'layout',
  Options = 'options',
  Pages = 'pages',
  Data = 'data'
}

export enum ActiveElements {
  Default = 'none'
}

export enum ActiveComponents {
  Navbar = 'navbar',
  Hero = 'hero',
  Placeholder = 'placeholder',
  Footer = 'footer',
  Features = 'features',
  Heading = 'heading'
}

export enum ActiveComponentsFullSelector {
  Navbar = '<app-builder-navbar></app-builder-navbar>',
  Hero = '<app-builder-hero></app-builder-hero>',
  Placeholder = '<app-builder-placeholder></app-builder-placeholder>',
  Footer = '<app-builder-footer></app-builder-footer>',
  Features = '<app-builder-features></app-builder-features>',
  Heading = '<app-builder-heading></app-builder-heading>'
}

export enum ActiveComponentsPartialSelector {
  Navbar = 'app-builder-navbar',
  Hero = 'app-builder-hero',
  Placeholder = 'app-builder-placeholder',
  Footer = 'app-builder-footer',
  Features = 'app-builder-features',
  Heading = 'app-builder-heading'
}

export enum ActiveTemplates {
  Default = 'default',
  Quick = 'business-1',
  Front = 'business-2'
}

export enum ActiveThemes {
  Default = 'Default',
  Stanley = 'Stanley'
}

export enum ActiveOrientations {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Mobile = 'mobile'
}

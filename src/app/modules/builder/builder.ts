export enum ActiveSettings {
  Templates = 'templates',
  Components = 'components',
  Colours = 'colours',
  Layout = 'layout',
  Options = 'options',
  Pages = 'pages',
  Data = 'data'
}

export enum ActiveComponents {
  Navbar = 'navbar',
  Hero = 'hero',
  Placeholder = 'placeholder',
  Footer = 'footer',
  Features = 'features'
}

export enum ActiveComponentsFullSelector {
  Navbar = '<app-builder-navbar></app-builder-navbar>',
  Hero = '<app-builder-hero></app-builder-hero>',
  Placeholder = '<app-builder-placeholder></app-builder-placeholder>',
  Footer = '<app-builder-footer></app-builder-footer>',
  Features = '<app-builder-features></app-builder-features>'
}

export enum ActiveComponentsPartialSelector {
  Navbar = 'app-builder-navbar',
  Hero = 'app-builder-hero',
  Placeholder = 'app-builder-placeholder',
  Footer = 'app-builder-footer',
  Features = 'app-builder-features'
}

export enum ActiveTemplates {
  Default = 'default',
  Quick = 'business-1',
  Front = 'business-2'
}

export enum ActiveNavbarThemes {
  Default = 'Default',
  Stanley = 'Stanley'
}

export enum ActiveFooterThemes {
  Default = 'Default',
  Stanley = 'Stanley'
}

export enum ActiveOrientations {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Mobile = 'mobile'
}

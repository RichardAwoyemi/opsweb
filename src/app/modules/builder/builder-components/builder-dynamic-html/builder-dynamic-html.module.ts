import { BuilderDynamicHtmlComponent } from './builder-dynamic-html.component';
import { ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders, NgModule } from '@angular/core';
import { BuilderDynamicHtmlOptions } from './builder-dynamic-html.interface';
import { BuilderDynamicHtmlService } from './builder-dynamic-html.service';

@NgModule({
  declarations: [BuilderDynamicHtmlComponent],
  exports: [BuilderDynamicHtmlComponent],
})
export class BuilderDynamicHtmlModule {
  static forRoot(options: BuilderDynamicHtmlOptions): ModuleWithProviders {
    return {
      ngModule: BuilderDynamicHtmlModule,
      providers: [
        BuilderDynamicHtmlService,
        {provide: BuilderDynamicHtmlOptions, useValue: options},
        {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: options.components, multi: true},
      ],
    };
  }
}

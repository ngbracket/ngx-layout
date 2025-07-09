import { provideServerRendering } from '@angular/ssr';
import {
  ApplicationConfig,
  importProvidersFrom,
  mergeApplicationConfig,
} from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    importProvidersFrom(FlexLayoutModule.withConfig({ serverLoaded: true })),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

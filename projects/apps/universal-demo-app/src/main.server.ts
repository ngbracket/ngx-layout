import { enableProdMode } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// export { AppServerModule } from './app/app.server.module';
export default () => bootstrapApplication(AppComponent);

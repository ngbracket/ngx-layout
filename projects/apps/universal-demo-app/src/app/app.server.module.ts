import { NgModule } from '@angular/core';

import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';
import { AppComponent } from './app.component';

@NgModule({
  imports: [FlexLayoutServerModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}

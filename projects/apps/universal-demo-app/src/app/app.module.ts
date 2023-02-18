import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@ngbrackets/ngx-layout';

import { AppComponent } from './app.component';
import { SplitModule } from './split/split.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FlexLayoutModule,
    SplitModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

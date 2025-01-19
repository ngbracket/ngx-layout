import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';

@NgModule({
  imports: [ServerModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}

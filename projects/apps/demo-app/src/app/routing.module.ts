import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DEMO_APP_ROUTES } from './app.routes';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(DEMO_APP_ROUTES)],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class RoutingModule {}

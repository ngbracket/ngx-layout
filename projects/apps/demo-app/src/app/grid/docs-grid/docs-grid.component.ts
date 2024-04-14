import {Component} from '@angular/core';
import { GridOverlayComponent } from '../grid-overlay/grid-overlay.component';
import { GridPositionComponent } from '../grid-position/grid-position.component';
import { GridMinmaxComponent } from '../grid-minmax/grid-minmax.component';
import { GridNestedComponent } from '../grid-nested/grid-nested.component';
import { GridLayoutComponent } from '../grid-layout/grid-layout.component';

@Component({
    selector: 'demo-docs-grid',
    template: `
    <demo-grid-layout class="small-demo"></demo-grid-layout>
    <demo-grid-nested class="small-demo"></demo-grid-nested>
    <demo-grid-minmax class="small-demo"></demo-grid-minmax>
    <demo-grid-position class="small-demo"></demo-grid-position>
    <demo-grid-overlay class="small-demo"></demo-grid-overlay>
  `,
    standalone: true,
    imports: [GridLayoutComponent, GridNestedComponent, GridMinmaxComponent, GridPositionComponent, GridOverlayComponent]
})
export class DocsGridComponent {}

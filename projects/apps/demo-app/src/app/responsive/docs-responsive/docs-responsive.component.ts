import {Component} from '@angular/core';
import { ResponsiveStyleComponent } from '../responsive-style/responsive-style.component';
import { ResponsiveShowHideComponent } from '../responsive-show-hide/responsive-show-hide.component';
import { ResponsiveFlexOrderComponent } from '../responsive-flex-order/responsive-flex-order.component';
import { ResponsiveFlexDirectiveComponent } from '../responsive-flex-directive/responsive-flex-directive.component';
import { ResponsiveRowColumnComponent } from '../responsive-row-column/responsive-row-column.component';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { ResponsiveLayoutDirectionComponent } from '../responsive-layout-direction/responsive-layout-direction.component';

@Component({
    selector: 'demo-docs-responsive',
    template: `
    <demo-responsive-layout-direction  class='small-demo' fxHide.print>
    </demo-responsive-layout-direction>
    <demo-responsive-row-column class='small-demo'>  </demo-responsive-row-column>
    <demo-responsive-flex-directive  class='small-demo'>  </demo-responsive-flex-directive>
    <demo-responsive-flex-order  class='small-demo'>  </demo-responsive-flex-order>
    <demo-responsive-show-hide  class='small-demo'>  </demo-responsive-show-hide>
    <demo-responsive-style  class='small-demo'>  </demo-responsive-style>
  `,
    standalone: true,
    imports: [ResponsiveLayoutDirectionComponent, ExtendedModule, ResponsiveRowColumnComponent, ResponsiveFlexDirectiveComponent, ResponsiveFlexOrderComponent, ResponsiveShowHideComponent, ResponsiveStyleComponent]
})
export class DocsResponsiveComponent {}

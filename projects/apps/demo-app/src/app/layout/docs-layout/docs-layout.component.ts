import {Component} from '@angular/core';
import { LayoutWithDirectionComponent } from '../layout-with-direction/layout-with-direction.component';
import { FlexAlignSelfComponent } from '../flex-align-self/flex-align-self.component';
import { FlexOffsetValuesComponent } from '../flex-offset-values/flex-offset-values.component';
import { FlexAttributeValuesComponent } from '../flex-attribute-values/flex-attribute-values.component';
import { FlexRowFillWrapComponent } from '../flex-row-fill-wrap/flex-row-fill-wrap.component';
import { FlexRowFillComponent } from '../flex-row-fill/flex-row-fill.component';
import { LayoutGapComponent } from '../layout-gap/layout-gap.component';
import { LayoutFillComponent } from '../layout-fill/layout-fill.component';
import { LayoutAlignmentComponent } from '../layout-alignment/layout-alignment.component';

@Component({
    selector: 'demo-docs-layout',
    template: `
    <demo-layout-alignment class="small-demo"></demo-layout-alignment>
    <demo-layout-fill class="small-demo"></demo-layout-fill>
    <demo-layout-gap class="small-demo"></demo-layout-gap>
    <demo-flex-row-fill class="small-demo"></demo-flex-row-fill>
    <demo-flex-row-fill-wrap class="small-demo"></demo-flex-row-fill-wrap>
    <demo-flex-attribute-values class="small-demo"></demo-flex-attribute-values>
    <demo-flex-offset-values class="small-demo"></demo-flex-offset-values>
    <demo-flex-align-self class="small-demo"></demo-flex-align-self>
    <demo-layout-with-direction class="small-demo"></demo-layout-with-direction>
  `,
    standalone: true,
    imports: [LayoutAlignmentComponent, LayoutFillComponent, LayoutGapComponent, FlexRowFillComponent, FlexRowFillWrapComponent, FlexAttributeValuesComponent, FlexOffsetValuesComponent, FlexAlignSelfComponent, LayoutWithDirectionComponent]
})
export class DocsLayoutComponent {}

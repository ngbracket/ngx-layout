import { Component } from '@angular/core';
import { SectionPageComponent } from '../../components/section-page/section-page.component';
import { menuItems } from '../../menu-items';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SectionPageComponent],
  template: `
    <app-section-page
      icon="view_column"
      title="Flexbox Layout"
      subtitle="Flexible one-dimensional layout with fxLayout, fxFlex and alignment directives"
      gradient="linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)"
      baseRoute="/layout"
      [items]="items"
    />
  `,
})
export class LayoutComponent {
  readonly items = menuItems.find(m => m.route === 'layout')?.subItems ?? [];
}

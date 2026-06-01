import { Component } from '@angular/core';
import { SectionPageComponent } from '../../components/section-page/section-page.component';
import { menuItems } from '../../menu-items';

@Component({
  selector: 'app-responsive',
  standalone: true,
  imports: [SectionPageComponent],
  template: `
    <app-section-page
      icon="devices"
      title="Responsive"
      subtitle="Adapt any layout to any screen size with xs / sm / md / lg / xl breakpoint aliases"
      gradient="linear-gradient(135deg, #bf360c 0%, #e64a19 100%)"
      baseRoute="/responsive"
      [items]="items"
    />
  `,
})
export class ResponsiveComponent {
  readonly items = menuItems.find(m => m.route === 'responsive')?.subItems ?? [];
}

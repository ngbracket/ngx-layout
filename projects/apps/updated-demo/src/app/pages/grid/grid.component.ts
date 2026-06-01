import { Component } from '@angular/core';
import { SectionPageComponent } from '../../components/section-page/section-page.component';
import { menuItems } from '../../menu-items';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [SectionPageComponent],
  template: `
    <app-section-page
      icon="grid_on"
      title="CSS Grid"
      subtitle="Build two-dimensional layouts with named areas, columns and rows"
      gradient="linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)"
      baseRoute="/grid"
      [items]="items"
    />
  `,
})
export class GridComponent {
  readonly items = menuItems.find(m => m.route === 'grid')?.subItems ?? [];
}

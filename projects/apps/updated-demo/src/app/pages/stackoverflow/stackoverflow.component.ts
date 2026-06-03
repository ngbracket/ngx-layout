import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionPageComponent } from '../../components/section-page/section-page.component';
import { menuItems } from '../../menu-items';

@Component({
  selector: 'app-stackoverflow',
  imports: [SectionPageComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <app-section-page
      icon="filter_none"
      title="Real-world Examples"
      subtitle="Curated demos from Stack Overflow, GitHub Issues and Angular Material documentation"
      gradient="linear-gradient(135deg, #4a148c 0%, #6a1b9a 100%)"
      baseRoute="/stackoverflow"
      [items]="items"
    />
  `,
})
export class StackoverflowComponent {
  readonly items =
    menuItems.find((m) => m.route === 'stackoverflow')?.subItems ?? [];
}

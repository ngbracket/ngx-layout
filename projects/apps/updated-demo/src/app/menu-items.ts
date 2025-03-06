import { Type } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GridComponent } from './pages/grid/grid.component';
import { GridLayoutComponent } from './pages/grid/layout/layout.component';
import { MinMaxComponent } from './pages/grid/minmax/minmax.component';
import { NestedComponent } from './pages/grid/nested/nested.component';
import { OverlayComponent } from './pages/grid/overlay/overlay.component';
import { PositionComponent } from './pages/grid/position/position.component';
import { AlignselfComponent } from './pages/layout/align-self/align-self.component';
import { AlignmentComponent } from './pages/layout/alignment/alignment.component';
import { AttributeValuesComponent } from './pages/layout/attribute-values/attribute-values.component';
import { DirectionComponent } from './pages/layout/direction/direction.component';
import { FillComponent } from './pages/layout/fill/fill.component';
import { GapComponent } from './pages/layout/gap/gap.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { OffsetValuesComponent } from './pages/layout/offset-values/offset-values.component';
import { RowFillWrapComponent } from './pages/layout/row-fill-wrap/row-fill-wrap.component';
import { RowFillComponent } from './pages/layout/row-fill/row-fill.component';
import { DirectiveComponent } from './pages/responsive/flex-directive/directive.component';
import { OrderComponent } from './pages/responsive/flex-order/order.component';
import { ResponsiveDirectionComponent } from './pages/responsive/layout-direction/direction.component';
import { ResponsiveComponent } from './pages/responsive/responsive.component';
import { RowColumnComponent } from './pages/responsive/row-column/row-column.component';
import { ShowHideComponent } from './pages/responsive/show-hide/show-hide.component';
import { StyleComponent } from './pages/responsive/style/style.component';
import { ColumnOrderingComponent } from './pages/stackoverflow/complex-column-ordering/column-ordering.component';
import { GridAreaRowSpanComponent } from './pages/stackoverflow/grid-area-row-span/grid-area-row-span.component';
import { GridColumnSpanComponent } from './pages/stackoverflow/grid-column-span/grid-column-span.component';
import { HideCustomBreakpointComponent } from './pages/stackoverflow/hide-custom-breakpoint/hide-custom-breakpoint.component';
import { HolyGrailComponent } from './pages/stackoverflow/holy-grail/holy-grail.component';
import { StackoverflowComponent } from './pages/stackoverflow/stackoverflow.component';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
  subItems?: MenuItem[];
  component?: Type<unknown>;
};

export const menuItems: MenuItem[] = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    route: 'dashboard',
    component: DashboardComponent,
  },
  {
    icon: 'grid_on',
    label: 'Grid',
    route: 'grid',
    component: GridComponent,
    subItems: [
      {
        icon: 'grid_on',
        label: 'grid-layout',
        route: 'grid-layout',
        component: GridLayoutComponent,
      },
      {
        icon: 'grid_on',
        label: 'grid-minmax',
        route: 'grid-minmax',
        component: MinMaxComponent,
      },
      {
        icon: 'grid_on',
        label: 'grid-nested',
        route: 'grid-nested',
        component: NestedComponent,
      },
      {
        icon: 'grid_on',
        label: 'grid-overlay',
        route: 'grid-overlay',
        component: OverlayComponent,
      },
      {
        icon: 'grid_on',
        label: 'grid-position',
        route: 'grid-position',
        component: PositionComponent,
      },
    ],
  },
  {
    icon: 'grid_view',
    label: 'Layout',
    route: 'layout',
    component: LayoutComponent,
    subItems: [
      {
        icon: 'grid_view',
        label: 'flex-align-self',
        route: 'flex-align-self',
        component: AlignselfComponent,
      },
      {
        icon: 'grid_view',
        label: 'flex-attribute-values',
        route: 'flex-attribute-values',
        component: AttributeValuesComponent,
      },
      {
        icon: 'grid_view',
        label: 'flex-offset-values',
        route: 'flex-offset-values',
        component: OffsetValuesComponent,
      },
      {
        icon: 'grid_view',
        label: 'flex-row-fill',
        route: 'flex-row-fill',
        component: RowFillComponent,
      },
      {
        icon: 'grid_view',
        label: 'flex-row-fill-wrap',
        route: 'flex-row-fill-wrap',
        component: RowFillWrapComponent,
      },
      {
        icon: 'grid_view',
        label: 'layout-alignment',
        route: 'layout-alignment',
        component: AlignmentComponent,
      },
      {
        icon: 'grid_view',
        label: 'layout-fill',
        route: 'layout-fill',
        component: FillComponent,
      },
      {
        icon: 'grid_view',
        label: 'layout-gap',
        route: 'layout-gap',
        component: GapComponent,
      },
      {
        icon: 'grid_view',
        label: 'layout-with-direction',
        route: 'layout-with-direction',
        component: DirectionComponent,
      },
    ],
  },

  {
    icon: 'aspect_ratio',
    label: 'Responsive',
    route: 'responsive',
    component: ResponsiveComponent,
    subItems: [
      {
        icon: 'aspect_ratio',
        label: 'responsive-flex-directive',
        route: 'responsive-flex-directive',
        component: DirectiveComponent,
      },
      {
        icon: 'aspect_ratio',
        label: 'responsive-flex-order',
        route: 'responsive-flex-order',
        component: OrderComponent,
      },
      {
        icon: 'aspect_ratio',
        label: 'responsive-layout-direction',
        route: 'responsive-layout-direction',
        component: ResponsiveDirectionComponent,
      },
      {
        icon: 'aspect_ratio',
        label: 'responsive-row-column',
        route: 'responsive-row-column',
        component: RowColumnComponent,
      },
      {
        icon: 'aspect_ratio',
        label: 'responsive-show-hide',
        route: 'responsive-show-hide',
        component: ShowHideComponent,
      },
      {
        icon: 'aspect_ratio',
        label: 'responsive-style',
        route: 'responsive-style',
        component: StyleComponent,
      },
    ],
  },
  {
    icon: 'filter_none',
    label: 'Stackoverflow',
    route: 'stackoverflow',
    component: StackoverflowComponent,
    subItems: [
      {
        icon: 'filter_none',
        label: 'Complex-column-ordering',
        route: 'complex-column-ordering',
        component: ColumnOrderingComponent,
      },
      {
        icon: 'filter_none',
        label: 'Grid-area-row-span',
        route: 'grid-area-row-span',
        component: GridAreaRowSpanComponent,
      },
      {
        icon: 'filter_none',
        label: 'Grid-column-span',
        route: 'grid-column-span',
        component: GridColumnSpanComponent,
      },
      {
        icon: 'filter_none',
        label: 'Hide-custom-breakpoint',
        route: 'hide-custom-breakpoint',
        component: HideCustomBreakpointComponent,
      },
      {
        icon: 'filter_none',
        label: 'Moz-holy-grail',
        route: 'moz-holy-grail',
        component: HolyGrailComponent,
      },
    ],
  },
];

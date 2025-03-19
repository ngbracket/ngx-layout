import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  GridAreaDirective,
  GridAreasDirective,
  GridColumnsDirective,
  GridGapDirective,
} from '@ngbracket/ngx-layout';
import { StyleDirective } from 'projects/libs/flex-layout/extended/style/style';

@Component({
  selector: 'app-grid-layout',
  imports: [
    MatCardModule,
    NgStyle,
    StyleDirective,
    GridAreaDirective,
    GridGapDirective,
    GridAreasDirective,
    GridColumnsDirective,
  ],
  template: ` <mat-card class="card-demo">
    <mat-card-title class="card-demo-title"
      >Basic Responsive Grid App</mat-card-title
    >
    <mat-card-content class="containerX">
      <div class="colorNested box" style="height: auto;">
        <div
          gdAreas.xs="header | sidebar | content | sidebar2 | footer"
          gdGap="1em"
          gdColumns.xs="none"
          gdAreas.sm="header header | sidebar content | sidebar2 sidebar2 | footer footer"
          gdColumns.sm="20%!"
          gdAreas.gt-sm="header header header | sidebar content sidebar2 | footer footer footer"
          gdColumns.gt-sm="120px auto 120px"
          gdGap.gt-sm="20px"
          [ngStyle]="{ 'max-width': 'auto' }"
          [ngStyle.gt-sm]="{ 'max-width': '600px' }"
        >
          <div class="blocks one" gdArea="header">Header</div>
          <div class="blocks two" gdArea="sidebar">Sidebar</div>
          <div class="blocks three" gdArea="sidebar2">Sidebar 2</div>
          <div class="blocks four" gdArea="content">
            Content <br />
            More content than we had before so this column is now quite tall.
          </div>
          <div class="blocks five" gdArea="footer">Footer</div>
        </div>
      </div>
    </mat-card-content>
  </mat-card>`,
  styles: [],
})
export class GridLayoutComponent {}

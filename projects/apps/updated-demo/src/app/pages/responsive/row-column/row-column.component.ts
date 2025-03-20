import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FlexDirective,
  LayoutDirective,
  MediaChange,
  MediaObserver,
} from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-row-column',
  imports: [MatCardModule, FlexDirective, LayoutDirective],
  template: `<mat-card class="card-demo">
    <mat-card-title>Multiple Responsive Columns</mat-card-title>
    <mat-card-subtitle>
      Simple row with nested layout containers. Note: the 1st column is
      responsive.
    </mat-card-subtitle>
    <mat-card-content>
      <div class="containerX">
        @if (isVisible) {
          <div class="colorNested box" fxLayout="row">
            <div
              [fxLayout]="cols['firstCol']"
              [fxLayout.xs]="cols['firstColXs']"
              [fxLayout.md]="cols['firstColMd']"
              [fxLayout.lg]="cols['firstColLg']"
              [fxLayout.gt-lg]="cols['firstColGtLg']"
              fxFlex="50%"
              fxFlex.gt-sm="25"
              fxHide.md
              (click)="toggleLayoutFor(1)"
              [style.cursor]="'pointer'"
            >
              <div fxFlex>Col #1: First item in row</div>
              <div fxFlex>Col #1: Second item in row</div>
            </div>
            <div
              [fxLayout]="cols['secondCol']"
              fxFlex
              (click)="toggleLayoutFor(2)"
              [style.cursor]="'pointer'"
            >
              <div fxFlex>Col #2: First item in column</div>
              <div fxFlex>Col #2: Second item in column</div>
            </div>
          </div>
        }
      </div>
    </mat-card-content>
    <mat-card-footer class="footer">
      <div fxLayout="row" class="hint" fxLayoutAlign="space-around">
        <div>
          &lt;div fxLayout="{{ cols['firstCol'] }}" fxFlex="50%"
          fxFlex.gt-sm="25%" fxHide.md &gt;
        </div>
        <div fxFlex></div>
        <div>&lt;div fxLayout="{{ cols['secondCol'] }}" fxFlex &gt;</div>
      </div>
    </mat-card-footer>
  </mat-card> `,
  styles: [
    `
      .footer {
        width: 95%;
        font-size: 0.9em;
        padding-left: 25px;
      }
    `,
  ],
})
export class RowColumnComponent {
  cols: { [key: string]: string } = {
    firstCol: 'row',
    firstColXs: 'column',
    firstColMd: 'column',
    firstColLg: 'invalid',
    firstColGtLg: 'column',
    secondCol: 'column',
  };
  isVisible = true;

  private activeMQC: MediaChange[] = [];
  private mediaService = inject(MediaObserver)
    .asObservable()
    .subscribe((events: MediaChange[]) => {
      this.activeMQC = events;
    });

  toggleLayoutFor(col: number) {
    this.activeMQC.forEach((change: MediaChange) => {
      switch (col) {
        case 1:
          let set1 = `firstCol${change ? change.suffix : ''}`;
          this.cols[set1] = this.cols[set1] === 'column' ? 'row' : 'column';
          break;

        case 2:
          let set2 = 'secondCol';
          this.cols[set2] = this.cols[set2] === 'row' ? 'column' : 'row';
          break;
      }
    });
  }
}

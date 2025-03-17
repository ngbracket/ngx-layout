import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FlexDirective,
  FlexOrderDirective,
  LayoutDirective,
} from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-holy-grail',
  imports: [MatCardModule, LayoutDirective, FlexDirective, FlexOrderDirective],
  template: `
    <mat-card class="card-demo">
      <mat-card-title>
        <a href="https://mzl.la/2vvxj25" target="_blank">
          Mozilla Holy-Grail Layout
        </a>
      </mat-card-title>
      <mat-card-subtitle>
        Illustrated here is the case where the page layout suited to a browser
        window must be optimized for a smart phone window. Not only must the
        elements reduce in size, but the order in which they are presented must
        change. Flexbox makes this very simple
      </mat-card-subtitle>
      <mat-card-content>
        <div class="containerX">
          <div class="colorNested box" fxLayout="column">
            <header>header</header>
            <div
              class="main"
              [fxLayout]="direction"
              fxLayout.xs="column"
              fxFlex
              (click)="toggleDirection()"
            >
              <nav fxFlex="1 6 20%" fxFlexOrder fxFlexOrder.xs="2">nav</nav>
              <article fxFlex="3 1 60%" fxFlexOrder fxFlexOrder.xs="1">
                article
              </article>
              <aside fxFlex="1 6 20%" fxFlexOrder fxFlexOrder.xs="3">
                aside
              </aside>
            </div>
            <footer>footer</footer>
          </div>
        </div>
      </mat-card-content>
      <mat-card-footer class="bottomPad">
        <div class="hint">
          &lt;div fxLayout="{{ direction }}" fxLayout.xs="column" &gt;
        </div>
      </mat-card-footer>
    </mat-card>
  `,
  styles: [
    `
      .colorNested,
      .containerX {
        min-height: 384px;
        background: #999999;
      }

      article,
      nav,
      aside,
      header,
      footer {
        margin: 4px;
        padding: 5px;
        border: 1px solid #cccc33;
        border-radius: 7px;
      }

      .main > article {
        border-color: #cccc33;
        background: #dddd88;
        cursor: pointer;
      }

      .main > nav,
      .main > aside {
        border-color: #8888bb;
        background: #ccccff;
      }

      header,
      footer {
        border-color: #eebb55;
        background: #ffeebb;
      }

      mat-card > mat-card-actions:last-child {
        padding-bottom: 16px;
      }

      mat-card > mat-card-actions > button {
        margin-left: 10px;
      }
    `,
  ],
})
export class HolyGrailComponent {
  direction = 'row';

  toggleDirection() {
    this.direction = this.direction === 'column' ? 'row' : 'column';
  }
}

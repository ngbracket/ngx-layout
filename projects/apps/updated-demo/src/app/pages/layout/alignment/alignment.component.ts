import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FlexDirective } from '@ngbracket/ngx-layout';
import { LayoutAlignDirective } from 'projects/libs/flex-layout/flex/layout-align/layout-align';
import { LayoutDirective } from 'projects/libs/flex-layout/flex/layout/layout';

@Component({
  selector: 'app-alignment',
  imports: [
    FormsModule,
    FlexDirective,
    LayoutAlignDirective,
    LayoutDirective,
    FlexDirective,
    LayoutDirective,
    LayoutAlignDirective,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
  ],
  template: ` <mat-card class="card-demo">
    <mat-card-title>Layout Alignment</mat-card-title>
    <mat-card-content>
      <div class="containerX">
        <div
          class="colorNested box"
          [class.taller]="options.direction !== 'row'"
        >
          <div
            style="height: 100%;"
            fxFlex
            [fxLayout]="options.direction"
            [fxLayoutAlign]="layoutAlign()"
          >
            <div class="blocks one">1</div>
            <div
              class="blocks"
              [class.two_h]="options.direction === 'row'"
              [class.two_w]="options.direction !== 'row'"
            >
              2
            </div>
            <div class="blocks three">3</div>
            <div
              class="blocks"
              [class.four_h]="options.direction === 'row'"
              [class.four_w]="options.direction !== 'row'"
            >
              4
            </div>
            <div class="blocks five">5</div>
          </div>
        </div>
      </div>
    </mat-card-content>
    <mat-card-actions
      fxlayout="row"
      fxLayoutAlign="center"
      fxhide
      fxHide.gt-sm="false"
    >
      <form
        fxlayout="row"
        fxLayout.xs="column"
        fxLayoutAlign="space-around stretch"
        class="demo_controls"
      >
        <div>
          <div>Layout directions</div>
          <mat-radio-group
            [(ngModel)]="options.direction"
            name="direction"
            fxLayout="column"
          >
            <mat-radio-button value="row">row</mat-radio-button>
            <mat-radio-button value="column">column</mat-radio-button>
          </mat-radio-group>
        </div>
        <div>
          <div>
            Alignment in layout direction ({{
              options.direction === 'row' ? 'horizontal' : 'vertical'
            }})
          </div>
          <mat-radio-group
            [(ngModel)]="options.mainAxis"
            name="mainAxis"
            fxLayout="column"
          >
            <mat-radio-button value="">none</mat-radio-button>
            <mat-radio-button value="start">start (default)</mat-radio-button>
            <mat-radio-button value="center">center</mat-radio-button>
            <mat-radio-button value="end">end</mat-radio-button>
            <mat-radio-button value="space-around"
              >space-around</mat-radio-button
            >
            <mat-radio-button value="space-between"
              >space-between</mat-radio-button
            >
            <mat-radio-button value="space-evenly"
              >space-evenly</mat-radio-button
            >
          </mat-radio-group>
        </div>
        <div>
          <div>
            Alignment in Perpendicular Direction ({{
              options.direction === 'column' ? 'horizontal' : 'vertical'
            }})
          </div>
          <mat-radio-group
            [(ngModel)]="options.crossAxis"
            name="crossAxis"
            fxLayout="column"
          >
            <mat-radio-button value="none"><em>none</em></mat-radio-button>
            <mat-radio-button value="start">start</mat-radio-button>
            <mat-radio-button value="center">center</mat-radio-button>
            <mat-radio-button value="end">end</mat-radio-button>
            <mat-radio-button value="stretch"
              >stretch (default)</mat-radio-button
            >
          </mat-radio-group>
        </div>
      </form>
    </mat-card-actions>
    <mat-card-footer>
      <div class="hint">
        &lt;div fxLayout="{{ options.direction }}"
        <span>fxLayoutAlign="{{ layoutAlign() }}"</span>
        &gt;
      </div>
    </mat-card-footer>
  </mat-card>`,
  styles: [
    `
      @use '@angular/material' as mat;

      mat-card {
        top: 20px;
        @include mat.card-overrides(
          (
            elevated-container-color: #fff,
            elevated-container-shape: 6px,
          )
        );
      }

      mat-card-title {
        margin: 10px 0 10px 20px;
      }
      .sub-title {
        margin-left: 20px;
        margin-bottom: 10px;
        font-weight: normal;
      }
    `,
  ],
})
export class AlignmentComponent {
  options = {
    direction: 'row',
    mainAxis: 'space-around',
    crossAxis: 'center',
  };

  layoutAlign() {
    return `${this.options.mainAxis} ${this.options.crossAxis}`;
  }
}

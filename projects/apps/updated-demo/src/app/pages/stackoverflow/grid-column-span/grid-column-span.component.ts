import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexDirective } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-grid-column-span',
  imports: [MatCardModule, FlexDirective],
  template: `<mat-card class="card-demo">
    <mat-card-title
      ><a href="http://jsfiddle.net/tndgvkfq/" target="_blank">JsFiddle</a>
    </mat-card-title>
    <mat-card-subtitle>
      Grid with column spans calculated using '<span style="color: #333333"
        >flex: &lt;grow&gt; &lt;shrink&gt; calc(&lt;...&gt;);</span
      >' expressions.
    </mat-card-subtitle>
    <mat-card-content>
      <div class="containerX">
        <div class="container">
          <div>flex: 1 1 5em;</div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="container">
          <div></div>
          <div [fxFlex]="calc2Cols">flex: 2 2 calc(10em + 10px);</div>
          <div></div>
        </div>
        <div class="container">
          <div [fxFlex]="calc2Cols">flex: 2 2 calc(10em + 10px);</div>
          <div></div>
          <div></div>
        </div>
        <div class="container">
          <div></div>
          <div></div>
          <div [fxFlex]="calc2Cols">flex: 2 2 calc(10em + 10px);</div>
        </div>
        <div class="container">
          <div [fxFlex]="calc3Cols" class="col3">
            flex: 3 3 calc(15em + 20px);
          </div>
          <div></div>
        </div>
        <div class="container">
          <div></div>
          <div [fxFlex]="calc3Cols" class="col3">
            flex: 3 3 calc(15em + 20px);
          </div>
        </div>
      </div>
    </mat-card-content>
    <mat-card-footer class="bottomPad">
      <div class="hint">
        Note: each cell has 'margin-left:10px' so the 'calc( )' expressions must
        account for those.
      </div>
    </mat-card-footer>
  </mat-card> `,
  styles: [
    `
      .containerX {
        padding: 5px;
        border: solid 1px #b6b6b6;
        box-sizing: content-box !important;
      }

      .card-demo mat-card,
      .card-demo mat-card-content {
        margin-bottom: 24px;
      }

      .card-demo mat-card-footer {
        left: 24px;
        margin-bottom: 24px;
      }

      div.container {
        display: flex;
        margin-bottom: 10px;
        color: white;
      }

      .container div[ng-reflect-flex*='calc'] {
        color: #343434;
        background-color: #8bc34a;
      }

      .container div.col3 {
        background-color: #009682;
        color: white;
      }

      div.container > div {
        flex: 1 1 5em;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: center;
        background-color: #03a9f4;
        margin-left: 10px;
        height: 50px;
        padding-left: 10px;
        padding-top: 10px;
      }

      div.container > div:first-child {
        margin-left: 0;
      }
    `,
  ],
})
export class GridColumnSpanComponent {
  calc2Cols = '2 2 calc(10em + 10px);';
  /** 10px is the missing margin of the missing box */
  calc3Cols = '3 3 calc(15em + 20px)';
  /** 20px is the missing margin of the two missing boxes */
}

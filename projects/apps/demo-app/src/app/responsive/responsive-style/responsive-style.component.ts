import {Component} from '@angular/core';

@Component({
    selector: 'demo-responsive-style',
    templateUrl: './responsive-style.component.html',
    standalone: false
})
export class ResponsiveStyleComponent {
  hasStyle = false;
  styleLgExp = {
    'font-size': '40px',
    color: 'lightgreen'
  };
}

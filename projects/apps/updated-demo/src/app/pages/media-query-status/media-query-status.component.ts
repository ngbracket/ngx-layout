import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MediaChange, MediaObserver } from '@ngbracket/ngx-layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-media-query-status',
  imports: [AsyncPipe],
  template: ` <div class="mqInfo">
    Active MediaQuery(s):
    <ul>
      @for(change of media$ | async ; track change){
      <li>{{ change.mqAlias }} = {{ change.mediaQuery }}</li>
      }
    </ul>
  </div>`,
  styles: [
    `
      .mqInfo {
        padding-left: 25px;
        margin-bottom: 5px;
        margin-top: 10px;
      }

      .mqInfo > span {
        padding-left: 0;
        color: rgba(0, 0, 0, 0.54);
        font-size: 0.8em;
      }

      .mqInfo > span::before {
        content: attr(title) ': ';
      }
    `,
  ],
})
export class MediaQueryStatusComponent {
  media$: Observable<MediaChange[]>;

  constructor(media: MediaObserver) {
    this.media$ = media.asObservable();
  }
}

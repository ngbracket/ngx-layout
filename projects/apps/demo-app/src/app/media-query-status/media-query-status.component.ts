import { Component } from '@angular/core';
import { MediaChange, MediaObserver } from '@ngbracket/ngx-layout';
import { Observable } from 'rxjs';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'media-query-status',
    template: `
    <div class="mqInfo">
      Active MediaQuery(s):
      <ul>
        <li *ngFor="let change of media$ | async as changes">
          {{ change.mqAlias }} = {{ change.mediaQuery }}
        </li>
      </ul>
    </div>
  `,
    styleUrls: ['./media-query-status.component.scss'],
    standalone: true,
    imports: [NgFor, AsyncPipe],
})
export class MediaQueryStatusComponent {
  media$: Observable<MediaChange[]>;

  constructor(media: MediaObserver) {
    this.media$ = media.asObservable();
  }
}

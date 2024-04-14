import {Component} from '@angular/core';
import { Issue197Component } from '../issue-197/issue-197.component';
import { Issue181Component } from '../issue-181/issue-181.component';
import { Issue135Component } from '../issue-135/issue-135.component';
import { Issue9897Component } from '../issue-9897/issue-9897.component';
import { Issue5345Component } from '../issue-5345/issue-5345.component';
import { Issue266Component } from '../issue-266/issue-266.component';

@Component({
    selector: 'demo-github-issues',
    template: `
    <demo-issue-266 class="small-demo"></demo-issue-266>
    <demo-issue-5345 class="small-demo"></demo-issue-5345>
    <demo-issue-9897 class="small-demo"></demo-issue-9897>
    <demo-issue-135 class="small-demo"></demo-issue-135>
    <demo-issue-181 class="small-demo"></demo-issue-181>
    <demo-issue-197 class="small-demo"></demo-issue-197>
  `,
    standalone: true,
    imports: [Issue266Component, Issue5345Component, Issue9897Component, Issue135Component, Issue181Component, Issue197Component]
})
export class GithubIssuesComponent {}

import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { MenuItem } from '../../menu-items';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, MatListModule, MatIconModule],
  template: `
    <a
      mat-list-item
      class="menu-item"
      [style.--mat-list-list-item-leading-icon-start-space]="indentation()"
      [routerLink]="routeHistory() + '/' + item().route"
      (click)="nestedItemOpen.set(!nestedItemOpen())"
      routerLinkActive="selected-menu-item"
      #rla="routerLinkActive"
      [activated]="rla.isActive"
    >
      <mat-icon
        [fontSet]="rla.isActive ? 'material-icons' : 'material-icons-outlined'"
        matListItemIcon
        >{{ item().icon }}</mat-icon
      >
      @if(!collapsed()) {
      <span matListItemTitle>{{ item().label }}</span>
      } @if(item().subItems) {
      <span matListItemMeta>
        @if(nestedItemOpen()) {
        <mat-icon>expand_less</mat-icon>
        } @else {
        <mat-icon>expand_more</mat-icon>
        }
      </span>
      }
    </a>
    @if (nestedItemOpen() ) {
    <div @expandContractMenu>
      @for(subItem of item().subItems; track subItem.route) {
      <app-menu-item
        [item]="subItem"
        [routeHistory]="routeHistory() + '/' + item().route"
        [collapsed]="collapsed()"
      />
      }
    </div>
    }
  `,
  styles: `

  @use '@angular/material' as mat;

  :host * {
        transition: all 500ms ease-in-out;
      }

  .menu-item {
        border-left: 5px solid;
        border-left-color: rgba(0, 0, 0, 0);

        @include mat.list-overrides((
          active-indicator-shape: 0px,
          active-indicator-color: rgba(0,0,0,0.05),
          list-item-one-line-container-height: 56px
        ));
    }

    .selected-menu-item {
      border-left-color: var(--mat-sys-primary);

      @include mat.list-overrides((
        list-item-leading-icon-color: var(--mat-sys-primary),
        list-item-hover-leading-icon-color: var(--mat-sys-primary),
        list-item-label-text-color: var(--mat-sys-primary),
        list-item-focus-label-text-color: var(--mat-sys-primary),
        list-item-hover-label-text-color: var(--mat-sys-primary),
      ));
    }

  `,
  animations: [
    trigger('expandContractMenu', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('500ms ease-in-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0, height: '0px' })),
      ]),
    ]),
  ],
})
export class MenuItemComponent {
  item = input.required<MenuItem>();
  collapsed = input.required<boolean>();
  routeHistory = input('');

  level = computed(() => this.routeHistory().split('/').length - 1);
  indentation = computed(() =>
    this.collapsed() ? '16px' : `${16 + this.level() * 16}px`
  );

  nestedItemOpen = signal(false);
}

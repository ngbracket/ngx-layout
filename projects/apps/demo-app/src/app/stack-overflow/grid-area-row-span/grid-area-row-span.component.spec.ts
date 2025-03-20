import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsStackOverflowModule } from '../stack-overflow.module';
import { GridAreaRowSpanComponent } from './grid-area-row-span.component';

describe('GridAreaRowSpanComponent', () => {
  let component: GridAreaRowSpanComponent;
  let fixture: ComponentFixture<GridAreaRowSpanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocsStackOverflowModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAreaRowSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

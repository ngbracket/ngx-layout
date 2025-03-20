import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsStackOverflowModule } from '../stack-overflow.module';
import { GridColumnSpanComponent } from './grid-column-span.component';

describe('GridColumnSpanComponent', () => {
  let component: GridColumnSpanComponent;
  let fixture: ComponentFixture<GridColumnSpanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocsStackOverflowModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridColumnSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

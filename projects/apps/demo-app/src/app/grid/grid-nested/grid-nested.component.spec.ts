import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsGridModule } from '../grid.module';
import { GridNestedComponent } from './grid-nested.component';

describe('GridNestedComponent', () => {
  let component: GridNestedComponent;
  let fixture: ComponentFixture<GridNestedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocsGridModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridNestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

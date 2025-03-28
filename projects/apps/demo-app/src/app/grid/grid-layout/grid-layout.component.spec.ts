import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsGridModule } from '../grid.module';
import { GridLayoutComponent } from './grid-layout.component';

describe('GridLayoutComponent', () => {
  let component: GridLayoutComponent;
  let fixture: ComponentFixture<GridLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocsGridModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

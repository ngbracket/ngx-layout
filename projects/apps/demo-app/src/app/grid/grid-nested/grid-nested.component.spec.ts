import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridNestedComponent } from './grid-nested.component';

describe('GridNestedComponent', () => {
  let component: GridNestedComponent;
  let fixture: ComponentFixture<GridNestedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [GridNestedComponent]
})
    .compileComponents();
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

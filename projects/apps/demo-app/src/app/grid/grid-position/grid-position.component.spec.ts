import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridPositionComponent } from './grid-position.component';

describe('GridPositionComponent', () => {
  let component: GridPositionComponent;
  let fixture: ComponentFixture<GridPositionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [GridPositionComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

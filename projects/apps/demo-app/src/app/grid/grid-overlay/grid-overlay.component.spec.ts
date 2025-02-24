import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridOverlayComponent } from './grid-overlay.component';

describe('GridOverlayComponent', () => {
  let component: GridOverlayComponent;
  let fixture: ComponentFixture<GridOverlayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [GridOverlayComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

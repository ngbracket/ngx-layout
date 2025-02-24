import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutAlignmentComponent } from './layout-alignment.component';

describe('LayoutAlignmentComponent', () => {
  let component: LayoutAlignmentComponent;
  let fixture: ComponentFixture<LayoutAlignmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [LayoutAlignmentComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAlignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

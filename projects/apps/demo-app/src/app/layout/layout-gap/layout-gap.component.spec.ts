import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutGapComponent } from './layout-gap.component';

describe('LayoutGapComponent', () => {
  let component: LayoutGapComponent;
  let fixture: ComponentFixture<LayoutGapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [LayoutGapComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutGapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

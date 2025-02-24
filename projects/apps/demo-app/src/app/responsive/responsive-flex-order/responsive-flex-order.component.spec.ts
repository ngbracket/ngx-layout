import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResponsiveFlexOrderComponent } from './responsive-flex-order.component';

describe('ResponsiveFlexOrderComponent', () => {
  let component: ResponsiveFlexOrderComponent;
  let fixture: ComponentFixture<ResponsiveFlexOrderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ResponsiveFlexOrderComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveFlexOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

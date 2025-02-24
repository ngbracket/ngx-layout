import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FlexAttributeValuesComponent } from './flex-attribute-values.component';

describe('FlexAttributeValuesComponent', () => {
  let component: FlexAttributeValuesComponent;
  let fixture: ComponentFixture<FlexAttributeValuesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [FlexAttributeValuesComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexAttributeValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

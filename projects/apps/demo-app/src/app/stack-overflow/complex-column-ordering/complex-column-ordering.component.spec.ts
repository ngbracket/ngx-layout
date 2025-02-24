import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComplexColumnOrderingComponent } from './complex-column-ordering.component';

describe('ComplexColumnOrderingComponent', () => {
  let component: ComplexColumnOrderingComponent;
  let fixture: ComponentFixture<ComplexColumnOrderingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ComplexColumnOrderingComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexColumnOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

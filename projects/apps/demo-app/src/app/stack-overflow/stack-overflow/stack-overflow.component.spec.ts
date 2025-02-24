import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StackOverflowComponent } from './stack-overflow.component';

describe('StackOverflowComponent', () => {
  let component: StackOverflowComponent;
  let fixture: ComponentFixture<StackOverflowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [StackOverflowComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackOverflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MozHolyGrailComponent } from './moz-holy-grail.component';

describe('MozHolyGrailComponent', () => {
  let component: MozHolyGrailComponent;
  let fixture: ComponentFixture<MozHolyGrailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [MozHolyGrailComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MozHolyGrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

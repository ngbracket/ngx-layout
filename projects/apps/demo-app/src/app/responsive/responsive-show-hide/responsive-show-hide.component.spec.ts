import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResponsiveShowHideComponent } from './responsive-show-hide.component';

describe('ResponsiveShowHideComponent', () => {
  let component: ResponsiveShowHideComponent;
  let fixture: ComponentFixture<ResponsiveShowHideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ResponsiveShowHideComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveShowHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

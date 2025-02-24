import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResponsiveLayoutDirectionComponent } from './responsive-layout-direction.component';

describe('ResponsiveLayoutDirectionComponent', () => {
  let component: ResponsiveLayoutDirectionComponent;
  let fixture: ComponentFixture<ResponsiveLayoutDirectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ResponsiveLayoutDirectionComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveLayoutDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

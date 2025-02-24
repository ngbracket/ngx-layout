import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResponsiveRowColumnComponent } from './responsive-row-column.component';

describe('ResponsiveRowColumnComponent', () => {
  let component: ResponsiveRowColumnComponent;
  let fixture: ComponentFixture<ResponsiveRowColumnComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ResponsiveRowColumnComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveRowColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

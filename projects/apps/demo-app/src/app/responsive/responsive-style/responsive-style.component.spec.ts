import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveStyleComponent } from './responsive-style.component';

describe('ResponsiveStyleComponent', () => {
  let component: ResponsiveStyleComponent;
  let fixture: ComponentFixture<ResponsiveStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [ResponsiveStyleComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

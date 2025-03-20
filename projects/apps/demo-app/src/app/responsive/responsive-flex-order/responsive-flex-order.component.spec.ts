import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsResponsiveModule } from '../responsive.module';
import { ResponsiveFlexOrderComponent } from './responsive-flex-order.component';

describe('ResponsiveFlexOrderComponent', () => {
  let component: ResponsiveFlexOrderComponent;
  let fixture: ComponentFixture<ResponsiveFlexOrderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocsResponsiveModule],
    }).compileComponents();
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

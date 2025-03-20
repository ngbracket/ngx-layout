import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsResponsiveModule } from '../responsive.module';
import { ResponsiveFlexDirectiveComponent } from './responsive-flex-directive.component';

describe('ResponsiveFlexDirectiveComponent', () => {
  let component: ResponsiveFlexDirectiveComponent;
  let fixture: ComponentFixture<ResponsiveFlexDirectiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocsResponsiveModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveFlexDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsResponsiveModule } from '../responsive.module';
import { ResponsiveShowHideComponent } from './responsive-show-hide.component';

describe('ResponsiveShowHideComponent', () => {
  let component: ResponsiveShowHideComponent;
  let fixture: ComponentFixture<ResponsiveShowHideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocsResponsiveModule],
    }).compileComponents();
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

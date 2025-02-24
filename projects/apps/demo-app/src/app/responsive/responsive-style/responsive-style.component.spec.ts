import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsResponsiveModule } from '../responsive.module';
import { ResponsiveStyleComponent } from './responsive-style.component';

describe('ResponsiveStyleComponent', () => {
  let component: ResponsiveStyleComponent;
  let fixture: ComponentFixture<ResponsiveStyleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [DocsResponsiveModule]
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

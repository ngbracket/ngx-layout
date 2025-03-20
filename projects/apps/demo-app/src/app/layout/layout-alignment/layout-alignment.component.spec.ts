import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsLayoutModule } from '../layout.module';
import { LayoutAlignmentComponent } from './layout-alignment.component';

describe('LayoutAlignmentComponent', () => {
  let component: LayoutAlignmentComponent;
  let fixture: ComponentFixture<LayoutAlignmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocsLayoutModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAlignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsLayoutModule } from '../layout.module';
import { FlexRowFillWrapComponent } from './flex-row-fill-wrap.component';

describe('FlexRowFillWrapComponent', () => {
  let component: FlexRowFillWrapComponent;
  let fixture: ComponentFixture<FlexRowFillWrapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocsLayoutModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexRowFillWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

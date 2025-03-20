import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsLayoutModule } from '../layout.module';
import { FlexAlignSelfComponent } from './flex-align-self.component';

describe('FlexAlignSelfComponent', () => {
  let component: FlexAlignSelfComponent;
  let fixture: ComponentFixture<FlexAlignSelfComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocsLayoutModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexAlignSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

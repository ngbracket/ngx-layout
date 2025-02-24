import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsLayoutModule } from '../layout.module';
import { FlexRowFillComponent } from './flex-row-fill.component';

describe('FlexRowFillComponent', () => {
  let component: FlexRowFillComponent;
  let fixture: ComponentFixture<FlexRowFillComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [DocsLayoutModule]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexRowFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

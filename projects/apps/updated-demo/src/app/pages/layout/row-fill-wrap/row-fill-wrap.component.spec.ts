import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RowFillWrapComponent } from './row-fill-wrap.component';

describe('RowFillWrapComponent', () => {
  let component: RowFillWrapComponent;
  let fixture: ComponentFixture<RowFillWrapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowFillWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

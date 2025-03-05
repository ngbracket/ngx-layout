import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OffsetValuesComponent } from './offset-values.component';

describe('OffsetValuesComponent', () => {
  let component: OffsetValuesComponent;
  let fixture: ComponentFixture<OffsetValuesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffsetValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

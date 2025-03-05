import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RowFillComponent } from './row-fill.component';

describe('RowFillComponent', () => {
  let component: RowFillComponent;
  let fixture: ComponentFixture<RowFillComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ColumnOrderingComponent } from './column-ordering.component';

describe('ColumnOrderingComponent', () => {
  let component: ColumnOrderingComponent;
  let fixture: ComponentFixture<ColumnOrderingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

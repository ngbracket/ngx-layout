import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GridAreaRowSpanComponent } from './grid-area-row-span.component';

describe('GridAreaRowSpanComponent', () => {
  let component: GridAreaRowSpanComponent;
  let fixture: ComponentFixture<GridAreaRowSpanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAreaRowSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

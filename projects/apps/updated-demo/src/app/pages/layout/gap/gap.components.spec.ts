import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GapComponent } from './gap.component';

describe('GapComponent', () => {
  let component: GapComponent;
  let fixture: ComponentFixture<GapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

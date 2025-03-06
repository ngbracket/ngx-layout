import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FillComponent } from './fill.component';

describe('FillComponent', () => {
  let component: FillComponent;
  let fixture: ComponentFixture<FillComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

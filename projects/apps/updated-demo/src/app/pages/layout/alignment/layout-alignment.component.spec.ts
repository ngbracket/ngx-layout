import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlignmentComponent } from './alignment.component';

describe('AlignmentComponent', () => {
  let component: AlignmentComponent;
  let fixture: ComponentFixture<AlignmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlignselfComponent } from './align-self.component';

describe('AlignselfComponent', () => {
  let component: AlignselfComponent;
  let fixture: ComponentFixture<AlignselfComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

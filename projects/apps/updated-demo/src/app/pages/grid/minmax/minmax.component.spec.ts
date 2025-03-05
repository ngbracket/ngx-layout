import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MinMaxComponent } from './minmax.component';

describe('MinmaxComponent', () => {
  let component: MinMaxComponent;
  let fixture: ComponentFixture<MinMaxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

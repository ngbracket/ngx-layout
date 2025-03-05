import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ShowHideComponent } from './show-hide.component';

describe('ShowHideComponent', () => {
  let component: ShowHideComponent;
  let fixture: ComponentFixture<ShowHideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

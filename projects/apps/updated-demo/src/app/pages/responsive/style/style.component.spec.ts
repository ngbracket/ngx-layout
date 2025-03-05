import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StyleComponent } from './style.component';

describe('StyleComponent', () => {
  let component: StyleComponent;
  let fixture: ComponentFixture<StyleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

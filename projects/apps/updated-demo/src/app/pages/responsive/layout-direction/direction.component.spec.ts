import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ResponsiveDirectionComponent } from './direction.component';

describe('ResponsiveDirectionComponent', () => {
  let component: ResponsiveDirectionComponent;
  let fixture: ComponentFixture<ResponsiveDirectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

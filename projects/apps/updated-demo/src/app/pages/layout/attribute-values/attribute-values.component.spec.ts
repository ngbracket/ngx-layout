import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AttributeValuesComponent } from './attribute-values.component';

describe('AttributeValuesComponent', () => {
  let component: AttributeValuesComponent;
  let fixture: ComponentFixture<AttributeValuesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

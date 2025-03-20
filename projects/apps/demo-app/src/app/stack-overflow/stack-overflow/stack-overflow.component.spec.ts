import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsStackOverflowModule } from '../stack-overflow.module';
import { StackOverflowComponent } from './stack-overflow.component';

describe('StackOverflowComponent', () => {
  let component: StackOverflowComponent;
  let fixture: ComponentFixture<StackOverflowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocsStackOverflowModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackOverflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

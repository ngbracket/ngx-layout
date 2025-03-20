import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsStackOverflowModule } from '../stack-overflow.module';
import { MozHolyGrailComponent } from './moz-holy-grail.component';

describe('MozHolyGrailComponent', () => {
  let component: MozHolyGrailComponent;
  let fixture: ComponentFixture<MozHolyGrailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocsStackOverflowModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MozHolyGrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

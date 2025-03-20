import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsLayoutModule } from '../layout.module';
import { LayoutWithDirectionComponent } from './layout-with-direction.component';

describe('LayoutWithDirectionComponent', () => {
  let component: LayoutWithDirectionComponent;
  let fixture: ComponentFixture<LayoutWithDirectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocsLayoutModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutWithDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

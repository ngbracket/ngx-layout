import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsGridModule } from '../grid.module';
import { GridMinmaxComponent } from './grid-minmax.component';

describe('GridMinmaxComponent', () => {
  let component: GridMinmaxComponent;
  let fixture: ComponentFixture<GridMinmaxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocsGridModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridMinmaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

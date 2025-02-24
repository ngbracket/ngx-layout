import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridMinmaxComponent } from './grid-minmax.component';

describe('GridMinmaxComponent', () => {
  let component: GridMinmaxComponent;
  let fixture: ComponentFixture<GridMinmaxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [GridMinmaxComponent]
})
    .compileComponents();
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

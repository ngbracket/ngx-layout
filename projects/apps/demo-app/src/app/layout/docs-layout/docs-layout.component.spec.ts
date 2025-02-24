import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsLayoutComponent } from './docs-layout.component';

describe('DocsLayoutComponent', () => {
  let component: DocsLayoutComponent;
  let fixture: ComponentFixture<DocsLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [DocsLayoutComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed, waitForAsync } from '@angular/core/testing';
import { VERSION } from '@ngbracket/ngx-layout';
import { AppComponent } from './app.component';
import { provideRouter, withHashLocation } from '@angular/router';
import { DEMO_APP_ROUTES } from './app.routes';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(DEMO_APP_ROUTES, withHashLocation())],
    }).compileComponents();
  }));
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as version the library version`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.version).toBe(VERSION.full);
  }));
  it('should render title in a h2 tag', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Layout Demos');
  }));
});

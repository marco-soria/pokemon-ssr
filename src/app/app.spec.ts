import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Component } from '@angular/core';
import { App } from './app';
import { Navbar } from './shared/components/navbar/navbar';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;
  let compiled: HTMLDivElement;

  @Component({
    selector: 'app-navbar',
    standalone: true,
    template: `<h1>Hola Mundo</h1>`,
  })
  class NavbarComponentMock {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), provideZonelessChangeDetection()],
    })
      .overrideComponent(App, {
        add: {
          imports: [NavbarComponentMock],
        },
        remove: {
          imports: [Navbar], // Aquí puedes agregar los componentes que quieras remover
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(App);
    compiled = fixture.nativeElement;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    // console.log(fixture.nativeElement);
    // expect(true).toBeFalse();

    expect(app).toBeTruthy();
  });

  it(`should render the navbar and router-outlet`, () => {
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pokemon-ssr');
  // });
});

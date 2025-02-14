import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import {  provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './shared/interceptors/header.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { loaderInterceptor } from './shared/interceptors/loader/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withViewTransitions(),withInMemoryScrolling({ scrollPositionRestoration: 'top' })),provideHttpClient(withFetch(),withInterceptors([headerInterceptor,loaderInterceptor])), provideAnimationsAsync(), 
  provideToastr(),importProvidersFrom(NgxSpinnerModule,BrowserAnimationsModule)]
};

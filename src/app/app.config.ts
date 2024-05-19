import { APP_INITIALIZER, ApplicationConfig, Provider, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { TestKeycloakService } from './core/service/test-keycloak.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptor/keycloak.interceptor';
import { KeycloakService } from 'keycloak-angular';
import { DOCUMENT } from '@angular/common';

// Provider for Keycloak Bearer Interceptor
const KeycloakBearerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiInterceptor,
  multi: true
 };

 // Provider for Keycloak Initialization
 const KeycloakInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: () => TestKeycloakService.init((inject(KeycloakService))),
  multi: true,
  deps: [KeycloakService]
 }

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    KeycloakBearerInterceptorProvider,
    KeycloakInitializerProvider,
    KeycloakService,
    { provide: Document, useExisting: DOCUMENT },
  ]
};

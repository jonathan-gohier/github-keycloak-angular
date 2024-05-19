import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject('keycloak-token') public token: string, private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this.token);

    const token = this.token || this.keycloakService.getToken();

    const setHeaders = {
      'Authorization': ''
    };

    if (!request.headers.has('Authorization') && token) {
      setHeaders['Authorization' as keyof typeof setHeaders] = `Bearer ${token}`;
    }

    return next.handle(
      request.clone({
        setHeaders,
      }),
    );
  }
}

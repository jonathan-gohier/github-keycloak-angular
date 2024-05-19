import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthKeycloakService extends KeycloakAuthGuard {
  private requiredRoles: any;
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }

    // Get the roles required from the route.
    this.requiredRoles = route.data['roles'];

    // Allow the user to proceed if no additional roles are required to access the route.
    if (!Array.isArray(this.requiredRoles) || this.requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    this.requiredRoles.every((role) => this.roles.includes(role));

    return true;
  }

  getIsLogged() {
    return this.authenticated
  }

  getUserRoles() {
    return this.requiredRoles
  }
}


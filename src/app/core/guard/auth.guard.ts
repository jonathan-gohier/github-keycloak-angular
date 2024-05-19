import { CanActivateFn } from '@angular/router';
import { AuthKeycloakService } from '../service/auth-keycloak.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {

  const authService = inject(AuthKeycloakService);
  const isLogged = authService.getIsLogged()

  console.log('isLogged : ', isLogged)
  return true;
};

import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import Keycloak from 'keycloak-js';

//declare var require: any;
const keycloakDom = typeof window !== 'undefined' ? Keycloak : null;

@Injectable({
  providedIn: 'root'
})
export class TestKeycloakService implements OnInit {

  //public static platformId = inject(PLATFORM_ID);
  public static isPlatformId: boolean;
  public static keycloakAuth: any;

  constructor(@Inject(PLATFORM_ID) public platformId: typeof PLATFORM_ID) {

  }

  ngOnInit(): void {
    TestKeycloakService.isPlatformId = isPlatformServer(this.platformId)
  }

  static init(keycloak: KeycloakService) {
    console.log('isKeycloakDom ??', keycloakDom)
    if (keycloakDom){
      console.log('dans le init !!')
      return async () =>
        await keycloak.init({
          // Configuration details for Keycloak
          config: {
            url: 'http://localhost:8081', // URL of the Keycloak server
            realm: 'keycloak-angular', // Realm to be used in Keycloak
            clientId: 'keycloak-angular' // Client ID for the application in Keycloak
          },
          // Options for Keycloak initialization
          initOptions: {
            onLoad: 'login-required', // Action to take on load
          },
          // Enables Bearer interceptor
          enableBearerInterceptor: true,
          // Prefix for the Bearer token
          bearerPrefix: 'Bearer',
          // URLs excluded from Bearer token addition (empty by default)
          //bearerExcludedUrls: []
        });
        console.log('is Connect');
    } else {
      return ()=>{
        return new Promise<Boolean>((resolve,reject)=>{
          resolve(true);
        });
      }
    }
  }

  static getToken(): string {
    return this.keycloakAuth.token;
  }

  static getRefreshToken(): string {
    return this.keycloakAuth.refreshToken;
  }


}

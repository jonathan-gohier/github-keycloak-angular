import { TestBed } from '@angular/core/testing';

import { TestKeycloakService } from './test-keycloak.service';

describe('TestKeycloakService', () => {
  let service: TestKeycloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestKeycloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

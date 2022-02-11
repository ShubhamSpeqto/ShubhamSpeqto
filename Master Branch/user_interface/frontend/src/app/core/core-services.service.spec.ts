import { TestBed } from '@angular/core/testing';

import { CoreServicesService } from './core-services.service';

describe('CoreServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoreServicesService = TestBed.get(CoreServicesService);
    expect(service).toBeTruthy();
  });
});

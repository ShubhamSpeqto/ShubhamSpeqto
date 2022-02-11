import { TestBed } from '@angular/core/testing';

import { OrderEngineService } from './order-engine.service';

describe('OrderEngineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderEngineService = TestBed.get(OrderEngineService);
    expect(service).toBeTruthy();
  });
});

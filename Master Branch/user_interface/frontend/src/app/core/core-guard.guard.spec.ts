import { TestBed, async, inject } from '@angular/core/testing';

import { CoreGuardGuard } from './core-guard.guard';

describe('CoreGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoreGuardGuard]
    });
  });

  it('should ...', inject([CoreGuardGuard], (guard: CoreGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});

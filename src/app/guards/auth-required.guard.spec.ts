import { TestBed, async, inject } from '@angular/core/testing';

import { AuthRequiredGuard } from './auth-required.guard';

describe('AuthRequiredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRequiredGuard]
    });
  });

  it('should ...', inject([AuthRequiredGuard], (guard: AuthRequiredGuard) => {
    expect(guard).toBeTruthy();
  }));
});

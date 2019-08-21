import { TestBed, async, inject } from '@angular/core/testing';

import { AuthRedirectGuard } from './auth-redirect.guard';

describe('AuthRedirectGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRedirectGuard]
    });
  });

  it('should ...', inject([AuthRedirectGuard], (guard: AuthRedirectGuard) => {
    expect(guard).toBeTruthy();
  }));
});

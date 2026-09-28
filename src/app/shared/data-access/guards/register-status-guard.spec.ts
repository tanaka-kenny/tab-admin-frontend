import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { registerStatusGuard } from './register-status-guard';

describe('registerStatusGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => registerStatusGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

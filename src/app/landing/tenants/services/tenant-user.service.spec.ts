import { TestBed } from '@angular/core/testing';

import { TenantUserService } from './tenant-user.service';

describe('TenantUserService', () => {
  let service: TenantUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

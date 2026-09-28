import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, provideRouter, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { TenantUserService } from '../data-access/services/tenant-user-service';

import { InvitaionSignUp } from './invitaion-sign-up';

describe('InvitaionSignUp', () => {
  let component: InvitaionSignUp;
  let fixture: ComponentFixture<InvitaionSignUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitaionSignUp],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParamMap: convertToParamMap({ token: 'test-token' }) }
          }
        },
        { provide: Auth, useValue: {} }
      ]
    })
    .overrideComponent(InvitaionSignUp, {
      set: {
        providers: [
          {
            provide: TenantUserService,
            useValue: {
              validateInvitation: () => of({
                email: 'jane@example.com',
                role: 'MANAGER',
                tenantName: 'Acme Corp',
                expiration: ''
              }),
              acceptInvite: () => of({})
            }
          }
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitaionSignUp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

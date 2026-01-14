import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetAuth } from './reset-auth';

describe('ResetAuth', () => {
  let component: ResetAuth;
  let fixture: ComponentFixture<ResetAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetAuth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetAuth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MiguardianGuard } from './miguardian.guard';

describe('MiguardianGuard', () => {
  let guard: MiguardianGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MiguardianGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

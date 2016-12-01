/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MnAuthService } from './mn-auth.service';

describe('Service: MnAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MnAuthService]
    });
  });

  it('should ...', inject([MnAuthService], (service: MnAuthService) => {
    expect(service).toBeTruthy();
  }));
});

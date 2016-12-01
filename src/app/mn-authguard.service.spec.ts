/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MnAuthguardService } from './mn-authguard.service';

describe('MnAuthguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MnAuthguardService]
    });
  });

  it('should ...', inject([MnAuthguardService], (service: MnAuthguardService) => {
    expect(service).toBeTruthy();
  }));
});

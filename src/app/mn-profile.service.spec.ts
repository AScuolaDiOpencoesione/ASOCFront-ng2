/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MnProfileService } from './mn-profile.service';

describe('Service: MnProfile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MnProfileService]
    });
  });

  it('should ...', inject([MnProfileService], (service: MnProfileService) => {
    expect(service).toBeTruthy();
  }));
});

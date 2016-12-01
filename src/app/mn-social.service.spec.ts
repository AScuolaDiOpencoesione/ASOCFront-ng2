/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MnSocialService } from './mn-social.service';

describe('Service: MnSocial', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MnSocialService]
    });
  });

  it('should ...', inject([MnSocialService], (service: MnSocialService) => {
    expect(service).toBeTruthy();
  }));
});

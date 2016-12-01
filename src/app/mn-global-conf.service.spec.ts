/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MnGlobalConfService } from './mn-global-conf.service';

describe('Service: MnGlobalConf', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MnGlobalConfService]
    });
  });

  it('should ...', inject([MnGlobalConfService], (service: MnGlobalConfService) => {
    expect(service).toBeTruthy();
  }));
});

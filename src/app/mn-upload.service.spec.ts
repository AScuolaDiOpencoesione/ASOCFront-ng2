/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MnUploadService } from './mn-upload.service';

describe('MnUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MnUploadService]
    });
  });

  it('should ...', inject([MnUploadService], (service: MnUploadService) => {
    expect(service).toBeTruthy();
  }));
});

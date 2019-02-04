import { TestBed, inject } from '@angular/core/testing';

import { LineDigitService } from './line-digit.service';

describe('LineDigitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LineDigitService]
    });
  });

  it('should be created', inject([LineDigitService], (service: LineDigitService) => {
    expect(service).toBeTruthy();
  }));
});

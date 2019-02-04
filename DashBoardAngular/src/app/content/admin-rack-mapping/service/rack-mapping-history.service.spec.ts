import { TestBed, inject } from '@angular/core/testing';

import { RackMappingHistoryService } from './rack-mapping-history.service';

describe('RackMappingHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RackMappingHistoryService]
    });
  });

  it('should be created', inject([RackMappingHistoryService], (service: RackMappingHistoryService) => {
    expect(service).toBeTruthy();
  }));
});

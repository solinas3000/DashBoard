import { TestBed, inject } from '@angular/core/testing';

import { SharingVariableService } from './sharing-variable.service';

describe('SharingVariableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharingVariableService]
    });
  });

  it('should be created', inject([SharingVariableService], (service: SharingVariableService) => {
    expect(service).toBeTruthy();
  }));
});

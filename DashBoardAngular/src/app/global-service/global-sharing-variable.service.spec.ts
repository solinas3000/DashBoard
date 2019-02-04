import { TestBed, inject } from '@angular/core/testing';

import { GlobalSharingVariableService } from './global-sharing-variable.service';

describe('GlobalSharingVariableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalSharingVariableService]
    });
  });

  it('should be created', inject([GlobalSharingVariableService], (service: GlobalSharingVariableService) => {
    expect(service).toBeTruthy();
  }));
});

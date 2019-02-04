import { TestBed, inject } from '@angular/core/testing';

import { RessourceHardwareService } from './ressource-hardware.service';

describe('RessourceHardwareServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RessourceHardwareService]
    });
  });

  it('should be created', inject([RessourceHardwareService], (service: RessourceHardwareService) => {
    expect(service).toBeTruthy();
  }));
});

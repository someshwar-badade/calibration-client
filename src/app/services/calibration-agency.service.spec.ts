import { TestBed } from '@angular/core/testing';

import { CalibrationAgencyService } from './calibration-agency.service';

describe('CalibrationAgencyService', () => {
  let service: CalibrationAgencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalibrationAgencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InstrumentCalibrationService } from './instrument-calibration.service';

describe('InstrumentCalibrationService', () => {
  let service: InstrumentCalibrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstrumentCalibrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

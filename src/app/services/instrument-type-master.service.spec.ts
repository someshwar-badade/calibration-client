import { TestBed } from '@angular/core/testing';

import { InstrumentTypeMasterService } from './instrument-type-master.service';

describe('InstrumentTypeMasterService', () => {
  let service: InstrumentTypeMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstrumentTypeMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

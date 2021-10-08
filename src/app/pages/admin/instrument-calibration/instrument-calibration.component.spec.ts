import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentCalibrationComponent } from './instrument-calibration.component';

describe('InstrumentCalibrationComponent', () => {
  let component: InstrumentCalibrationComponent;
  let fixture: ComponentFixture<InstrumentCalibrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentCalibrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentCalibrationObservationFormComponent } from './instrument-calibration-observation-form.component';

describe('InstrumentCalibrationObservationFormComponent', () => {
  let component: InstrumentCalibrationObservationFormComponent;
  let fixture: ComponentFixture<InstrumentCalibrationObservationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentCalibrationObservationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentCalibrationObservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

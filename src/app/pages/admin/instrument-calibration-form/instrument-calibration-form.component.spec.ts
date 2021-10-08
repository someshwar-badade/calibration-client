import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentCalibrationFormComponent } from './instrument-calibration-form.component';

describe('InstrumentCalibrationFormComponent', () => {
  let component: InstrumentCalibrationFormComponent;
  let fixture: ComponentFixture<InstrumentCalibrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentCalibrationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentCalibrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

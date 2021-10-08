import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentCalibrationDetailsComponent } from './instrument-calibration-details.component';

describe('InstrumentCalibrationDetailsComponent', () => {
  let component: InstrumentCalibrationDetailsComponent;
  let fixture: ComponentFixture<InstrumentCalibrationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentCalibrationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentCalibrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

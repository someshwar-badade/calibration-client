import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationAgencyComponent } from './calibration-agency.component';

describe('CalibrationAgencyComponent', () => {
  let component: CalibrationAgencyComponent;
  let fixture: ComponentFixture<CalibrationAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationAgencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

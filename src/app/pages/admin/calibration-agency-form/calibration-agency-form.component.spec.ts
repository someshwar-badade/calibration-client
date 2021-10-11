import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationAgencyFormComponent } from './calibration-agency-form.component';

describe('CalibrationAgencyFormComponent', () => {
  let component: CalibrationAgencyFormComponent;
  let fixture: ComponentFixture<CalibrationAgencyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationAgencyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationAgencyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationCompletionComponent } from './calibration-completion.component';

describe('CalibrationCompletionComponent', () => {
  let component: CalibrationCompletionComponent;
  let fixture: ComponentFixture<CalibrationCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationCompletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

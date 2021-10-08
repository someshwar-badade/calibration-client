import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentTypeMasterParameterFormComponent } from './instrument-type-master-parameter-form.component';

describe('InstrumentTypeMasterParameterFormComponent', () => {
  let component: InstrumentTypeMasterParameterFormComponent;
  let fixture: ComponentFixture<InstrumentTypeMasterParameterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentTypeMasterParameterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentTypeMasterParameterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

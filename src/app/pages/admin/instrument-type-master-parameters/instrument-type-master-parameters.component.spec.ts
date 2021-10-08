import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentTypeMasterParametersComponent } from './instrument-type-master-parameters.component';

describe('InstrumentTypeMasterParametersComponent', () => {
  let component: InstrumentTypeMasterParametersComponent;
  let fixture: ComponentFixture<InstrumentTypeMasterParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentTypeMasterParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentTypeMasterParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

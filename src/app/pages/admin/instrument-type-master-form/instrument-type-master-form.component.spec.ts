import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentTypeMasterFormComponent } from './instrument-type-master-form.component';

describe('InstrumentMasterFormComponent', () => {
  let component: InstrumentTypeMasterFormComponent;
  let fixture: ComponentFixture<InstrumentTypeMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentTypeMasterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentTypeMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentMasterFormComponent } from './instrument-master-form.component';

describe('InstrumentMasterFormComponent', () => {
  let component: InstrumentMasterFormComponent;
  let fixture: ComponentFixture<InstrumentMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentMasterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

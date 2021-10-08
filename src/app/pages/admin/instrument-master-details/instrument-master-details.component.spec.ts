import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentMasterDetailsComponent } from './instrument-master-details.component';

describe('InstrumentMasterDetailsComponent', () => {
  let component: InstrumentMasterDetailsComponent;
  let fixture: ComponentFixture<InstrumentMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentMasterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

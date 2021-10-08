import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentTypeMasterDetailsComponent } from './instrument-type-master-details.component';

describe('InstrumentTypeMasterDetailsComponent', () => {
  let component: InstrumentTypeMasterDetailsComponent;
  let fixture: ComponentFixture<InstrumentTypeMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentTypeMasterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentTypeMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

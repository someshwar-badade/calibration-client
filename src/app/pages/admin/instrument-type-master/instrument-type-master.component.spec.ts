import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentTypeMasterComponent } from './instrument-type-master.component';

describe('InstrumentTypeMasterComponent', () => {
  let component: InstrumentTypeMasterComponent;
  let fixture: ComponentFixture<InstrumentTypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentTypeMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

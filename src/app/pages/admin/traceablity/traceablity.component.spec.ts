import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceablityComponent } from './traceablity.component';

describe('TraceablityComponent', () => {
  let component: TraceablityComponent;
  let fixture: ComponentFixture<TraceablityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraceablityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceablityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

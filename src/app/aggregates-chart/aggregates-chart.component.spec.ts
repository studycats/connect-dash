import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatesChartComponent } from './aggregates-chart.component';

describe('AggregatesChartComponent', () => {
  let component: AggregatesChartComponent;
  let fixture: ComponentFixture<AggregatesChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggregatesChartComponent]
    });
    fixture = TestBed.createComponent(AggregatesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsEffortComponent } from './insights-effort.component';

describe('InsightsEffortComponent', () => {
  let component: InsightsEffortComponent;
  let fixture: ComponentFixture<InsightsEffortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsightsEffortComponent]
    });
    fixture = TestBed.createComponent(InsightsEffortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

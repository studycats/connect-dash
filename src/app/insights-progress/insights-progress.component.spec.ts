import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsProgressComponent } from './insights-progress.component';

describe('InsightsProgressComponent', () => {
  let component: InsightsProgressComponent;
  let fixture: ComponentFixture<InsightsProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsightsProgressComponent]
    });
    fixture = TestBed.createComponent(InsightsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

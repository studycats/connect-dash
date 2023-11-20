import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumUnitComponent } from './curriculum-unit.component';

describe('CurriculumUnitComponent', () => {
  let component: CurriculumUnitComponent;
  let fixture: ComponentFixture<CurriculumUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurriculumUnitComponent]
    });
    fixture = TestBed.createComponent(CurriculumUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

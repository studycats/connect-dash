import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWordsComponent } from './new-words.component';

describe('NewWordsComponent', () => {
  let component: NewWordsComponent;
  let fixture: ComponentFixture<NewWordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewWordsComponent]
    });
    fixture = TestBed.createComponent(NewWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

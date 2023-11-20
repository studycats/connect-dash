import { TestBed } from '@angular/core/testing';

import { UnitResultsService } from './unit-results.service';

describe('UnitResultsService', () => {
  let service: UnitResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

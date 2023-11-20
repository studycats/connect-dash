import { TestBed } from '@angular/core/testing';

import { RecentExperienceService } from './recent-experience.service';

describe('RecentExperienceService', () => {
  let service: RecentExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

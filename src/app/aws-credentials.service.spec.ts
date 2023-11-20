import { TestBed } from '@angular/core/testing';

import { AwsCredentialsService } from './aws-credentials.service';

describe('AwsCredentialsService', () => {
  let service: AwsCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

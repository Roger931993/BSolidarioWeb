import { TestBed } from '@angular/core/testing';

import { MattermostLoggerService } from './mattermost-logger.service';

describe('MattermostLoggerService', () => {
  let service: MattermostLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MattermostLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

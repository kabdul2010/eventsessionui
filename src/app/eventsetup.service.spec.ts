import { TestBed } from '@angular/core/testing';

import { EventsetupService } from './eventsetup.service';

describe('EventsetupService', () => {
  let service: EventsetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

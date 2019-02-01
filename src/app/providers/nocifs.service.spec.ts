import { TestBed } from '@angular/core/testing';

import { RelouService } from './relou-service.service';

describe('RelouServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelouService = TestBed.get(RelouService);
    expect(service).toBeTruthy();
  });
});

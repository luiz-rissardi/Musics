import { TestBed } from '@angular/core/testing';

import { EmiterService } from './emiter.service';

describe('EmiterService', () => {
  let service: EmiterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmiterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

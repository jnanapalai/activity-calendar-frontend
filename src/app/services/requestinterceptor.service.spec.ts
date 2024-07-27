import { TestBed } from '@angular/core/testing';

import { RequestinterceptorService } from './requestinterceptor.service';

describe('RequestinterceptorService', () => {
  let service: RequestinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

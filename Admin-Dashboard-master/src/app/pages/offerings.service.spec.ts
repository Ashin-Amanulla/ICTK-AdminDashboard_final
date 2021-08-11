import { TestBed } from '@angular/core/testing';

import { OfferingsService } from './offerings.service';

describe('OfferingsService', () => {
  let service: OfferingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

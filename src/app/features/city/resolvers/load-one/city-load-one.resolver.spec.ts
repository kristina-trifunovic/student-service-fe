import { TestBed } from '@angular/core/testing';

import { CityLoadOneResolver } from './city-load-one.resolver';

describe('CityLoadOneResolver', () => {
  let resolver: CityLoadOneResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CityLoadOneResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

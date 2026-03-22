/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WishlistsService } from './wishlists.service';

describe('Service: Wishlists', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WishlistsService]
    });
  });

  it('should ...', inject([WishlistsService], (service: WishlistsService) => {
    expect(service).toBeTruthy();
  }));
});

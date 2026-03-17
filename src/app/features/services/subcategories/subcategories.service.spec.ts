/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubcategoriesService } from './subcategories.service';

describe('Service: Subcategories', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubcategoriesService]
    });
  });

  it('should ...', inject([SubcategoriesService], (service: SubcategoriesService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';



import { FoodService } from './food-service.service';

describe('FoodServiceService', () => {
  let service: FoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

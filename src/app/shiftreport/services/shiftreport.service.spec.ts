import { TestBed } from '@angular/core/testing';

import { ShiftreportService } from './shiftreport.service';

describe('ShiftreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShiftreportService = TestBed.get(ShiftreportService);
    expect(service).toBeTruthy();
  });
});

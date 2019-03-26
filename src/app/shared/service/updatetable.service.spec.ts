import { TestBed } from '@angular/core/testing';

import { UpdatetableService } from './updatetable.service';

describe('UpdatetableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdatetableService = TestBed.get(UpdatetableService);
    expect(service).toBeTruthy();
  });
});

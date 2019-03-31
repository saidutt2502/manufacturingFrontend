import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HodlocationComponent } from './hodlocation.component';

describe('HodlocationComponent', () => {
  let component: HodlocationComponent;
  let fixture: ComponentFixture<HodlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HodlocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HodlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

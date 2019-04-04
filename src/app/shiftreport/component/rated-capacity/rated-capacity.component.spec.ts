import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedCapacityComponent } from './rated-capacity.component';

describe('RatedCapacityComponent', () => {
  let component: RatedCapacityComponent;
  let fixture: ComponentFixture<RatedCapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatedCapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatedCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

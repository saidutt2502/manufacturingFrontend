import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsystemsComponent } from './usystems.component';

describe('UsystemsComponent', () => {
  let component: UsystemsComponent;
  let fixture: ComponentFixture<UsystemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsystemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

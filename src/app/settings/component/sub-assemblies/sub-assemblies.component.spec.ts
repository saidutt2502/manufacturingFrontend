import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAssembliesComponent } from './sub-assemblies.component';

describe('SubAssembliesComponent', () => {
  let component: SubAssembliesComponent;
  let fixture: ComponentFixture<SubAssembliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAssembliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAssembliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

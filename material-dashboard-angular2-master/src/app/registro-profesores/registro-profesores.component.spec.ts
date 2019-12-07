import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroProfesoresComponent } from './registro-profesores.component';

describe('RegistroProfesoresComponent', () => {
  let component: RegistroProfesoresComponent;
  let fixture: ComponentFixture<RegistroProfesoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroProfesoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

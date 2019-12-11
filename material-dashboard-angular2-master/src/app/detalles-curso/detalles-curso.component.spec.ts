import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCursoComponent } from './detalles-curso.component';

describe('DetallesCursoComponent', () => {
  let component: DetallesCursoComponent;
  let fixture: ComponentFixture<DetallesCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

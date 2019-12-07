import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProfesoresService } from '../services/profesores.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $:any; /* jQuery - Intentar usar lo menos posible */

export interface nombramiento {
  value: string;
  viewValue: string;
}

export interface nivel {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registro-profesores',
  templateUrl: './registro-profesores.component.html',
  styleUrls: ['./registro-profesores.component.css']
})
export class RegistroProfesoresComponent implements OnInit {
  nombramientos: nombramiento[] = [
    { value: 'tiempo completo', viewValue: 'Tiempo Completo' },
    { value: 'medio tiempo', viewValue: 'Medio Tiempo' },
    { value: 'asignatura', viewValue: 'Asignatura' }
  ];
  niveles: nivel[] = [
    { value: 'a', viewValue: 'A' },
    { value: 'b', viewValue: 'B' },
    { value: 'c', viewValue: 'C' }
  ];
  /* El nombre de las variables será el mismo que los campos en la base de datos. */
  public id_profesor:string;
  public titulo:string;
  public codigo_udeg:string;
  public nombres:string;
  public apellido_paterno:string;
  public apellido_materno:string;
  public fecha_nacimiento:string;
  public antiguedad:string;
  public telefono:string;
  public correo_principal:string;
  public correo_secundario:string;
  public categoria:string;
  public nombramiento:string;
  public nivel:string;
  public materias:string;
  /* Variables utilizadas en la vista */
  public texto_cabecera:string;
  public texto_subcabecera:string;
  public texto_boton:string;
  /* Variables para recibir parametros */
  public parametro:any;

  constructor(
    private profesoresService: ProfesoresService,
    private route: ActivatedRoute
  ) {
    this.titulo = '';
    this.codigo_udeg = '';
    this.nombres = '';
    this.apellido_paterno = '';
    this.apellido_materno = '';
    this.fecha_nacimiento = '';
    this.antiguedad = '';
    this.telefono = '';
    this.correo_principal = '';
    this.correo_secundario = '';
    this.categoria = '';
    this.nombramiento = '';
    this.nivel = '';
    this.materias = '';
    this.texto_cabecera = '';
    this.texto_subcabecera = '';
    this.texto_boton = '';
    /**
     * Si hay un parametro definido en la URL, lo asigna a la variable.
     * De lo contrario la inicializa como string vacio;
     */
    this.parametro = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id_profesor = params['id'];
      } else {
        this.id_profesor = '';
      } 
    });
  }
  
  ngOnInit() {
    if(this.id_profesor == ''){
      this.texto_cabecera = 'Registrar Profesor';
      this.texto_boton = 'Registrar'
      this.texto_subcabecera = 'Revisa que la información esté correcta';
    } 
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
  }

}

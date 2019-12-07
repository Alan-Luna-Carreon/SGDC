import { Component, OnInit } from '@angular/core';
import { ProfesoresService } from '../services/profesores.service';
import { ActivatedRoute } from '@angular/router';
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
  public codigo_udg:string;
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
    this.codigo_udg = '';
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
    if( this.id_profesor == '' ){
      this.texto_cabecera = 'Registrar Profesor';
      this.texto_boton = 'Registrar'
      this.texto_subcabecera = 'Revisa que la información esté correcta';
    } else {
      this.select_by( this.id_profesor );
    }
  }

  /**
   * Registra o actualiza a un maestro.
   */
  public actionButtonClicked(){
    if( this.apellido_paterno != '' && this.titulo != '' && this.codigo_udg != '' &&
        this.correo_principal != '' && this.nombres != ''){ // Datos necesarios en la base de datos
      let profesor = {
        id_profesor: this.id_profesor,
        titulo: this.titulo,
        codigo_udg: this.codigo_udg,
        nombres: this.nombres,
        apellido_paterno: this.apellido_paterno,
        apellido_materno: this.apellido_materno,
        fecha_nacimiento: this.fecha_nacimiento,
        antiguedad: this.antiguedad,
        telefono: this.telefono,
        correo_principal: this.correo_principal,
        correo_secundario: this.correo_secundario,
        categoria: this.categoria,
        nombramiento: this.nombramiento,
        nivel: this.nivel,
        materias: this.materias
      }
      if( this.id_profesor != '' ){ // Se recibio un ID por parametro.
        let id = { id_profesor: this.id_profesor };
        this.profesoresService.select_by(id).subscribe( // Se valida que el ID pertenezca a alguíen activo.
          response => {
            if( !response.error ){ 
              if( response.profesor.length == 1 ){ // la consulta encontro al menos un registro
                this.profesoresService.update(profesor).subscribe(
                  response => {
                    if( !response.error ){ 
                      this.showNotification('success',response.msj);
                      this.clearForm(); // Se actualizo los datos [SALIDA]
                    } else {
                      this.showNotification('danger',response.msj);
                    }
                  },
                  error => {
                    this.showNotification('danger',error);
                  }
                );
              } else { // El ID no le pertenecia a nadie activo.
                this.showNotification('warning','No se encontraron datos del maestro especificado o se encuentra dado de baja');
                this.clearForm();
              }
            } else {
              this.showNotification('danger',response.msj);
            }
          },
          error => {
            this.showNotification('danger',error);
          }
        );
      } else { // Detectado como un usuario nuevo
        this.profesoresService.insert(profesor).subscribe(
          response => {
            if( !response.error ){ // Consulta a la base de datos exitosa.
              this.showNotification('success',response.msj);
              this.clearForm();
            } else {
              this.showNotification('error',response.msj);
            }
          },
          error => {
            this.showNotification('danger',error);
          }
        );
      }
    } else {
      this.showNotification('warning','Hay campos pendientes por llenar para realizar el registro');
    }
  }

  /**
   * Obtiene la información sobre determinado maestro previamente registrado.
   * @param id_profesor ID recibido por parametros en la URL
   */
  public select_by(id_profesor:string){
    let id = {
      id_profesor: id_profesor
    }
    this.profesoresService.select_by(id).subscribe(
      response => {
        if( !response.error ){ // Consulta a la base de datos exitosa.
          if( response.profesor.length == 1 ){ // la consulta encontro al menos un registro
            this.id_profesor = response.profesor[0].id_profesor;
            this.titulo = response.profesor[0].titulo;
            this.codigo_udg = response.profesor[0].codigo_udg;
            this.nombres = response.profesor[0].nombres;
            this.apellido_paterno = response.profesor[0].apellido_paterno;
            this.apellido_materno = response.profesor[0].apellido_materno;
            this.fecha_nacimiento = response.profesor[0].fecha_nacimiento;
            this.antiguedad = response.profesor[0].antiguedad;
            this.telefono = response.profesor[0].telefono;
            this.correo_principal = response.profesor[0].correo_principal;
            this.correo_secundario = response.profesor[0].correo_secundario;
            this.categoria = response.profesor[0].categoria;
            this.nombramiento = response.profesor[0].nombramiento;
            this.nivel = response.profesor[0].nivel;
            this.materias = response.profesor[0].materias;
            this.texto_cabecera = 'Perfil de '+ this.nombres + ' ' + this.apellido_paterno + ' ' + this.apellido_materno;
            this.texto_boton = 'Actualizar Usuario'
            this.texto_subcabecera = 'Revisa que la información esté correcta';
            this.showNotification('success',response.msj);
          } else {
            this.clearForm();
            this.texto_cabecera = 'Registrar Profesor';
            this.texto_boton = 'Registrar'
            this.texto_subcabecera = 'Revisa que la información esté correcta';
            this.showNotification('warning','No se encontraron datos del maestro especificado o se encuentra dado de baja');
          }
        } else {
          this.showNotification('error',response.msj);
        }
      },
      error => {
        this.showNotification('success',error);
      }
    );
  }

  /**
   * Limpia el formulario para el siguiente registro.
   */
  public clearForm(){
    this.titulo = '';
    this.codigo_udg = '';
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
    this.id_profesor = ''
    this.texto_cabecera = 'Registrar Profesor';
    this.texto_boton = 'Registrar'
    this.texto_subcabecera = 'Revisa que la información esté correcta';
  }

  /**
   * @param color los valores compatibles son: 'success' para exito, 'warning' para errores del usuario o 'danger' para errores de ejecución;
   * @param mensaje Respuesta de la petición donde se llamará a está funcion.
   */
  public showNotification(color,mensaje){
    $.notify({
        icon: "notifications",
        message: mensaje
    },{
        type: color,
        timer: 1000,
        placement: {
            from: 'top',
            align: 'right'
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}

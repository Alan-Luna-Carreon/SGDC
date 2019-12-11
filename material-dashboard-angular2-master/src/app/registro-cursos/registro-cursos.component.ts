import { Component, OnInit } from '@angular/core';
import { CursosService } from '../services/cursos.service';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

export interface estatus {
  value: string,
  viewValue:string

}
@Component({
  selector: 'app-registro-cursos',
  templateUrl: './registro-cursos.component.html',
  styleUrls: ['./registro-cursos.component.scss']
})
export class RegistroCursosComponent implements OnInit {
  estatus_curso: estatus[] = [
    { value: 'publico', viewValue: 'Publico' },
    { value: 'privado', viewValue: 'Privado' },
    { value: 'cancelado', viewValue: 'Cancelado' },
    { value: 'oculto', viewValue: 'Oculto' }
  ]
  /* El nombre de las variables será el mismo que los campos en la base de datos. */
  public id_curso:string;
  public titulo:string;
  public descripcion:string;
  public descripcion_corta:string;
  public portada:string;
  public fecha:string;
  public hora:string;
  public presentador:string;
  public direccion:string;
  public url_google_maps:string;
  public etiquetas:string;
  public lugares_disponibles:string;
  public estatus:string;
  /* Variables utilizadas en la vista */
  public texto_cabecera:string;
  public texto_subcabecera:string;
  public texto_boton:string;
  /* Variables para recibir parametros */
  public parametro:any;

  constructor(
    private cursosService: CursosService,
    private route: ActivatedRoute
  ) {
    this.titulo = '';
    this.descripcion = '';
    this.descripcion_corta = '';
    this.portada = '';
    this.fecha = '';
    this.hora = '';
    this.presentador = '';
    this.direccion = '';
    this.url_google_maps = '';
    this.etiquetas = '';
    this.lugares_disponibles = '';
    this.estatus = '';
    this.texto_cabecera = '';
    this.texto_subcabecera = '';
    this.texto_boton = '';
    /**
     * Si hay un parametro definido en la URL, lo asigna a la variable.
     * De lo contrario la inicializa como string vacio;
     */
    this.parametro = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id_curso = params['id'];
      } else {
        this.id_curso = '';
      } 
    });
  }

  ngOnInit() {
    if( this.id_curso == '' ){
      this.texto_cabecera = 'Registrar Curso';
      this.texto_boton = 'Registrar'
      this.texto_subcabecera = 'Revisa que la información esté correcta';
    } else {
      this.select_by( this.id_curso );
    }
  }

  /**
   * Registra o actualiza a un maestro.
   */
  public actionButtonClicked(){
    if( this.titulo != '' && this.descripcion != '' && this.descripcion_corta != ''){ // Datos necesarios en la base de datos
      let curso = {
        id_curso: this.id_curso,
        titulo: this.titulo,
        descripcion: this.descripcion,
        descripcion_corta: this.descripcion_corta,
        portada: this.portada,
        fecha: this.fecha,
        hora: this.hora,
        presentador: this.presentador,
        direccion: this.direccion,
        url_google_maps: this.url_google_maps,
        etiquetas: this.etiquetas,
        lugares_disponibles: this.lugares_disponibles,
        estatus: this.estatus
      }
      if( this.id_curso != '' ){ // Se recibio un ID por parametro.
        let id = { id_curso: this.id_curso };
        this.cursosService.select_by(id).subscribe( // Se valida que el ID pertenezca a alguíen activo.
          response => {
            if( !response.error ){ 
              if( response.curso.length == 1 ){ // la consulta encontro al menos un registro
                this.cursosService.update(curso).subscribe(
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
                this.showNotification('warning','No se encontraron datos del curso especificado o se encuentra dado de baja');
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
        this.cursosService.insert(curso).subscribe(
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
   * @param id_curso ID recibido por parametros en la URL
   */
  public select_by(id_curso:string){
    let id = {
      id_curso: id_curso
    }
    this.cursosService.select_by(id).subscribe(
      response => {
        if( !response.error ){ // Consulta a la base de datos exitosa.
          if( response.curso.length == 1 ){ // la consulta encontro al menos un registro
            this.id_curso = response.curso[0].id_curso;
            this.titulo = response.curso[0].titulo;
            this.descripcion = response.curso[0].descripcion;
            this.descripcion_corta = response.curso[0].descripcion_corta;
            this.portada = response.curso[0].portada;
            this.fecha = response.curso[0].fecha;
            this.hora = response.curso[0].hora;
            this.presentador = response.curso[0].presentador;
            this.direccion = response.curso[0].direccion;
            this.url_google_maps = response.curso[0].url_google_maps;
            this.etiquetas = response.curso[0].etiquetas;
            this.lugares_disponibles = response.curso[0].lugares_disponibles;
            this.estatus = response.curso[0].estatus;
            this.texto_cabecera = 'Información del curso ' + this.titulo;
            this.texto_boton = 'Actualizar Curso'
            this.texto_subcabecera = 'Revisa que la información esté correcta';
            this.showNotification('success',response.msj);
          } else {
            this.clearForm();
            this.texto_cabecera = 'Registrar Curso';
            this.texto_boton = 'Registrar'
            this.texto_subcabecera = 'Revisa que la información esté correcta';
            this.showNotification('warning','No se encontraron datos del curso especificado o se encuentra dado de baja');
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
    this.descripcion = '';
    this.descripcion_corta = '';
    this.portada = '';
    this.fecha = '';
    this.hora = '';
    this.presentador = '';
    this.direccion = '';
    this.url_google_maps = '';
    this.etiquetas = '';
    this.lugares_disponibles = '';
    this.estatus = '';
    this.id_curso = ''
    this.texto_cabecera = 'Registrar Curso';
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

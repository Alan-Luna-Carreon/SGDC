import { Component, OnInit } from '@angular/core';
import { ProfesoresService } from '../services/profesores.service'
declare var $: any;

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {
  public profesores:any;
  constructor(
    private profesoresService:ProfesoresService
  ) { 
    this.profesores = [];
  }

  ngOnInit() {
    this.select_all();
  }
  
  public select_all(){
    this.profesoresService.select_all().subscribe(
      response => {
        if(!response.error){
          this.showNotification('success', response.msj );
          this.profesores = response.profesores;
        } else {
          this.showNotification('danger',response.msj);
        }
      },
      error => {
        console.log(error);
        this.showNotification('danger',error);
      }
    );
  }

  /**
   * 
   * @param flag 
   * @param id_profesor 
   */
  public update_deleted(flag:string, id_profesor:string){
    let deleted = '0';
    if(flag == 'inactive'){
      deleted = '1'
    } 
    let profesor = {
      id_profesor,
      deleted
    }
    this.profesoresService.update_deteled(profesor).subscribe(
      response => {
        if(!response.error){
          this.showNotification('success', response.msj );
        } else {
          this.showNotification('danger',response.msj);
        }
      },
      error => {
        console.log(error);
        this.showNotification('danger',error);
      }
    );
    this.select_all();
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

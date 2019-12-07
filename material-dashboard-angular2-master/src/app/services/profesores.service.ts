import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { App } from './app'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService extends App{

  constructor( private http:HttpClient) { 
    super();
  }

  public setProfesor(Profesor):Observable<any>{
    const params:string = JSON.stringify(Profesor);
    return this.http.post('http://sgdc.taban.mx/sgdc/API/profesores/insert', params, {headers: this.headers});
  }

  public getProfesor(id_profesor):Observable<any>{
    const params:string = JSON.stringify(id_profesor);
    return this.http.post('http://sgdc.taban.mx/sgdc/API/profesores/select_by', params, {headers: this.headers});
  }

  public updateProfesor(Profesor):Observable<any>{
    const params:string = JSON.stringify(Profesor);
    return this.http.post('http://sgdc.taban.mx/sgdc/API/profesores/update', params, {headers: this.headers});
  }

  public getProfesores():Observable<any>{
    const params:string = JSON.stringify({ accion:'accion' });
    return this.http.post('http://sgdc.taban.mx/sgdc/API/profesores/', params, {headers: this.headers});
  }
  
}

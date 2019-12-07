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

  public insert(Profesor):Observable<any>{
    const params:string = JSON.stringify(Profesor);
    return this.http.post('http://sgdc.taban.mx/sgdc/API/profesores/insert/', params, {headers: this.headers});
  }

  public select_by(id_profesor):Observable<any>{
    console.log(id_profesor)
    const params:string = JSON.stringify(id_profesor);
    return this.http.post('http://sgdc.taban.mx/sgdc/API/profesores/select_by/', params, {headers: this.headers});
  }

  public update(Profesor):Observable<any>{
    const params:string = JSON.stringify(Profesor);
    return this.http.post('http://sgdc.taban.mx/sgdc/API/profesores/update/', params, {headers: this.headers});
  }

  public select_all():Observable<any>{
    const params:string = JSON.stringify({ accion:'accion' });
    return this.http.post('http://sgdc.taban.mx/sgdc/API/profesores/select_all/', params, {headers: this.headers});
  }
}

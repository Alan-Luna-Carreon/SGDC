import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { App } from './app'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService extends App{

  constructor( private http:HttpClient) { 
    super();
  }

  public insert(cursos):Observable<any>{
    const params:string = JSON.stringify(cursos);
    return this.http.post('http://sgdc.taban.mx/sgdc/API/cursos/insert/', params, {headers: this.headers});
  }

  public select_by(id_cursos):Observable<any>{
    const params:string = JSON.stringify(id_cursos);
    return this.http.post('http://sgdc.taban.mx/sgdc/API/cursos/select_by/', params, {headers: this.headers});
  }

  public update(cursos):Observable<any>{
    const params:string = JSON.stringify(cursos);
    return this.http.post('http://sgdc.taban.mx/sgdc/API/cursos/update/', params, {headers: this.headers});
  }

  public select_all():Observable<any>{
    const params:string = JSON.stringify({ accion:'accion' });
    return this.http.post('http://sgdc.taban.mx/sgdc/API/cursos/select_all/', params, {headers: this.headers});
  }

  public update_deteled(cursos):Observable<any>{
    const params:string = JSON.stringify(cursos);
    return this.http.post('http://sgdc.taban.mx/sgdc/API/cursos/update/deleted/', params, {headers: this.headers});
  }
}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Conexion } from '../util/conexion';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CargueMasivoService {

  constructor(private http: HttpClient) { }

  obtenerCarguesMasivos(filtro: any) {
    const url = Conexion.UrlApi.concat(Conexion.obtenerCarguesMasivos);
    return this.http.post(url, filtro, httpOptions);
  }

  obtenerCarguesMasivosDet(filtro: any) {
    // console.log(filtro,'filtro/obtenerCarguesMasivosDet');
    const url = Conexion.UrlApi.concat(Conexion.obtenerCarguesMasivosDet);
    return this.http.post(url, filtro, httpOptions);
  }

  crearNuevoCargueMasivo(datos: any) {
    // console.log(datos,'datos/crearNuevoCargueMasivo');
    const url = Conexion.UrlApi.concat(Conexion.crearNuevoCargueMasivo);
    return this.http.post(url, datos, httpOptions);
  }

}

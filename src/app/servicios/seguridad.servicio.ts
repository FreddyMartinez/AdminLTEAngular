import {Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Conexion } from '../util/conexion';
import { MenuModelo } from '../modelos/menu.modelo';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class SeguridadServicios {

    constructor(private http: HttpClient){
    }

    ConsultaVersionBack(){
        const url = Conexion.UrlApi.concat(Conexion.versionBack);
        return this.http.get(url, httpOptions);
    }
    
    ConsultarMenu(){
        const url = Conexion.UrlApi.concat(Conexion.consultarMenu);
        return this.http.post(url, "", httpOptions);
    }    
    
    CrearMenu(menu : MenuModelo){
        const url = Conexion.UrlApi.concat(Conexion.crearMenu);
        return this.http.post(url, menu, httpOptions);
    }
    
    ModificarMenu(menu : MenuModelo){
        const url = Conexion.UrlApi.concat(Conexion.modificarMenu);
        return this.http.post(url, menu, httpOptions);
    }
}

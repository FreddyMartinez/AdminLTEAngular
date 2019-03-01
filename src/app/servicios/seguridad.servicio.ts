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

    EliminarMenu(menu : MenuModelo){
        const url = Conexion.UrlApi.concat(Conexion.eliminarMenu);
        return this.http.post(url, menu, httpOptions);
    }
    
    ConsultarGrupo(){
        const url = Conexion.UrlApi.concat(Conexion.consultarGrupo);
        return this.http.post(url, "", httpOptions);
    }    
    
    CrearGrupo(menu : MenuModelo){
        const url = Conexion.UrlApi.concat(Conexion.crearMenu);
        return this.http.post(url, menu, httpOptions);
    }
    
    ModificarGrupo(menu : MenuModelo){
        const url = Conexion.UrlApi.concat(Conexion.modificarMenu);
        return this.http.post(url, menu, httpOptions);
    }

    EliminarGrupo(menu : MenuModelo){
        const url = Conexion.UrlApi.concat(Conexion.eliminarMenu);
        return this.http.post(url, menu, httpOptions);
    }
}

import {Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Conexion } from '../util/conexion';
import { ParametroConsulta } from '../modelos/parametro.consulta.modelo';
import { ClienteModelo } from '../modelos/cliente.modelo';
import { ModeloGenerico } from '../modelos/modelo.generico';
import { EmpresaModelo } from '../modelos/empresa.modelo';
import { SucursalEmpresaModelo } from '../modelos/sucursal.empresa.modelo';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class EmpresasServicios {
    
    
    constructor(private http: HttpClient){
        
    }

    //#region Clientes
    ConsultarEmpresas(empresa: ModeloGenerico){
        const url = Conexion.UrlApi.concat(Conexion.consultarEmpresas);
        return this.http.post(url, empresa, httpOptions);
    }

    ModificarEmpresa(empresa: EmpresaModelo){
        const url = Conexion.UrlApi.concat(Conexion.editarEmpresas);
        return this.http.post(url, empresa, httpOptions);
    }

    CrearEmpresa(empresa: EmpresaModelo){
        const url = Conexion.UrlApi.concat(Conexion.crearEmpresas);
        return this.http.post(url, empresa, httpOptions);
    }
 
    EliminarEmpresa(empresa: EmpresaModelo){
        const url = Conexion.UrlApi.concat(Conexion.eliminarEmpresas);
        return this.http.post(url, empresa, httpOptions);
    }
    //#endregion

    //#region Sucursal

    ConsultarSucursales(empresa: ModeloGenerico){
        const url = Conexion.UrlApi.concat(Conexion.consultarSucursalEmpresas);
        return this.http.post(url, empresa, httpOptions);
    }

    ModificarSucursal(sucursal: SucursalEmpresaModelo){
        const url = Conexion.UrlApi.concat(Conexion.editarSucursalEmpresa);
        return this.http.post(url, sucursal, httpOptions);
    }

    CrearSucursal(sucursal: SucursalEmpresaModelo){
        const url = Conexion.UrlApi.concat(Conexion.crearSucursalEmpresa);
        return this.http.post(url, sucursal, httpOptions);
    }
 
    EliminarSucursal(sucursal: SucursalEmpresaModelo){
        const url = Conexion.UrlApi.concat(Conexion.eliminarSucursalEmpresa);
        return this.http.post(url, sucursal, httpOptions);
    }
    //#endregion
}
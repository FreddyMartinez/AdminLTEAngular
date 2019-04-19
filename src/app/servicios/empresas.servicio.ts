import {Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Conexion } from '../util/conexion';
import { ParametroConsulta } from '../modelos/parametro.consulta.modelo';
import { ClienteModelo } from '../modelos/cliente.modelo';
import { ModeloGenerico } from '../modelos/modelo.generico';
import { EmpresaModelo } from '../modelos/empreesa.modelo';


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
}
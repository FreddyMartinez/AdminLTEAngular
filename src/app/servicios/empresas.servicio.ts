import {Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Conexion } from '../util/conexion';
import { ParametroConsulta } from '../modelos/parametro.consulta.modelo';
import { ClienteModelo } from '../modelos/cliente.modelo';
import { ModeloGenerico } from '../modelos/modelo.generico';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class EmpresasServicios {

    constructor(private http: HttpClient){
    }

    //#region Clientes
    ConsultarEmpresas(empresa: ModeloGenerico){
        const url = Conexion.UrlApi.concat(Conexion.consultarClientes);
        return this.http.post(url, empresa, httpOptions);
    }

    /* ModificarCliente(cliente: ClienteModelo){
        const url = Conexion.UrlApi.concat(Conexion.consultarClientes);
        return this.http.post(url, cliente, httpOptions);
    }

    CrearCliente(cliente: ClienteModelo){
        const url = Conexion.UrlApi.concat(Conexion.consultarClientes);
        return this.http.post(url, cliente, httpOptions);
    }

    EliminarCliente(cliente: ClienteModelo){
        const url = Conexion.UrlApi.concat(Conexion.consultarClientes);
        return this.http.post(url, cliente, httpOptions);
    }
 */    //#endregion
}
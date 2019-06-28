import {Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Conexion } from '../util/conexion';
import { ParametroConsulta } from '../modelos/parametro.consulta.modelo';
import { ClienteModelo } from '../modelos/cliente.modelo';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class ClientesServicios {

    constructor(private http: HttpClient){
    }

    //#region Clientes
    ConsultarClientes(usuario: ParametroConsulta){
        const url = Conexion.UrlApi.concat(Conexion.consultarClientes);
        return this.http.post(url, usuario, httpOptions);
    }

    ModificarCliente(cliente: ClienteModelo){
        const url = Conexion.UrlApi.concat(Conexion.editarCliente);
        return this.http.post(url, cliente, httpOptions);
    }

    CrearCliente(cliente: ClienteModelo){
        const url = Conexion.UrlApi.concat(Conexion.crearCliente);
        return this.http.post(url, cliente, httpOptions);
    }

    EliminarCliente(cliente: ClienteModelo){
        const url = Conexion.UrlApi.concat(Conexion.eliminarCliente);
        return this.http.post(url, cliente, httpOptions);
    }

    ConsultarClienteReferidor(){
        const url = Conexion.UrlApi.concat(Conexion.consultarClienteReferidor);
        return this.http.post(url, "", httpOptions);
    }
    //#endregion
}
import {Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Conexion } from '../util/conexion';
import { PerfilModelo } from '../modelos/perfil.modelo';
import { RolModelo } from '../modelos/rol.modelo';
import { PermisoPerfilModelo } from '../modelos/permiso.perfil.modelo';
import { ParametroConsulta } from '../modelos/parametro.consulta.modelo';
import { PerfilRolModelo } from '../modelos/perfil.rol.modelo';
import { UsuarioModelo } from '../modelos/usuario.modelo';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class UsuariosServicios {

    constructor(private http: HttpClient){
    }
    //#region Perfil
    ConsultarPerfiles(){
        const url = Conexion.UrlApi.concat(Conexion.consultarPerfiles);
        return this.http.post(url, "", httpOptions);
    }    
    
    CrearPerfil(perfil : PerfilModelo){
        const url = Conexion.UrlApi.concat(Conexion.crearPerfil);
        return this.http.post(url, perfil, httpOptions);
    }
    
    ModificarPerfil(perfil : PerfilModelo){
        const url = Conexion.UrlApi.concat(Conexion.modificarPerfil);
        return this.http.post(url, perfil, httpOptions);
    }

    EliminarPerfil(perfil : PerfilModelo){
        const url = Conexion.UrlApi.concat(Conexion.eliminarPerfil);
        return this.http.post(url, perfil, httpOptions);
    }

    ConsultaClientes(){
        const url = Conexion.UrlApi.concat(Conexion.consultaClientes);
        return this.http.post(url, "", httpOptions);
    }

    ConsultarPermisosPerfil(idPerfil : ParametroConsulta){
        const url = Conexion.UrlApi.concat(Conexion.consultarPermisosPerfil);
        return this.http.post(url, idPerfil, httpOptions);
    }    
        
    ModificarPermisoPerfil(perfil : PermisoPerfilModelo){
        const url = Conexion.UrlApi.concat(Conexion.modificarPermisoPerfil);
        return this.http.post(url, perfil, httpOptions);
    }
    //#endregion

    //#region Rol
    ConsultarRoles(){
        const url = Conexion.UrlApi.concat(Conexion.consultarRoles);
        return this.http.post(url, "", httpOptions);
    }    
    
    CrearRol(perfil : RolModelo){
        const url = Conexion.UrlApi.concat(Conexion.crearRol);
        return this.http.post(url, perfil, httpOptions);
    }
    
    ModificarRol(perfil : RolModelo){
        const url = Conexion.UrlApi.concat(Conexion.modificarRol);
        return this.http.post(url, perfil, httpOptions);
    }

    EliminarRol(perfil : RolModelo){
        const url = Conexion.UrlApi.concat(Conexion.eliminarRol);
        return this.http.post(url, perfil, httpOptions);
    }
    
    ConsultarPerfilesRol(idPerfil : ParametroConsulta){
        const url = Conexion.UrlApi.concat(Conexion.consultarPerfilesRol);
        return this.http.post(url, idPerfil, httpOptions);
    }    
        
    ModificarPerfilRol(perfil : PerfilRolModelo){
        const url = Conexion.UrlApi.concat(Conexion.modificarPerfilRol);
        return this.http.post(url, perfil, httpOptions);
    }
    //#endregion

    ConsultarUsuarios(){
        const url = Conexion.UrlApi.concat(Conexion.consultarUsuarios);
        return this.http.post(url, "", httpOptions);
    }    
    
    CrearUsuario(usuario : UsuarioModelo){
        const url = Conexion.UrlApi.concat(Conexion.crearUsuario);
        return this.http.post(url, usuario, httpOptions);
    }
    
    ModificarUsuario(usuario : UsuarioModelo){
        const url = Conexion.UrlApi.concat(Conexion.modificarUsuario);
        return this.http.post(url, usuario, httpOptions);
    }

    EliminarUsuario(usuario : UsuarioModelo){
        const url = Conexion.UrlApi.concat(Conexion.eliminarUsuario);
        return this.http.post(url, usuario, httpOptions);
    }

    ConsultarTiposRol(){
        const url = Conexion.UrlApi.concat(Conexion.consultarTiposRol);
        return this.http.post(url, "", httpOptions);
    }

    ConsultarTiposDocumento(){
        const url = Conexion.UrlApi.concat(Conexion.consultarTiposDocumento);
        return this.http.post(url, "", httpOptions);
    }

    CambioClave(clave: UsuarioModelo){
        const url = Conexion.UrlApi.concat(Conexion.cambioClave);
        return this.http.post(url, clave, httpOptions);
    }
}
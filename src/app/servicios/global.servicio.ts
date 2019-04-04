import { Injectable } from '@angular/core';
import { UsuarioModelo } from '../modelos/usuario.modelo';
import { Router } from '@angular/router';

@Injectable()
export class ServicioGlobal {

    private usuario: UsuarioModelo;
    public token: string;

    constructor(
        private router:Router
    ) {
        this.obtenerToken();
        this.obtenerUsuario();
    }

    public getUsuario() {
        return this.usuario;
    }

    public setUsuario(usuario: UsuarioModelo) {
        localStorage.setItem("Usuario", JSON.stringify(usuario));
        this.usuario = usuario;
    }

    public obtenerUsuario() {
        this.usuario = JSON.parse(localStorage.getItem("Usuario"));
    }

    public obtenerToken(){
        this.token = localStorage.getItem("Token");
    }

    public InicioSesion(){
        this.router.navigate(["login"]);
    }

    public NavegarRoot(){
        window.location.replace("./");
    }
}
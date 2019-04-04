export class UsuarioModelo {

    usuario: string;
    tipoDocumento: string;
    documento: string;
    clave: string;
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    rol: string;
    nombreRol: string;
    cliente: string;
    activo: boolean;

    constructor(usuario?: string, 
        email?: string, 
        clave?:string, 
        rol?: string, 
        nombre?:string) {
        this.usuario = usuario;
        this.email = email;
        this.clave = clave;
        this.rol = rol;
        this.nombre = nombre;
    }
}
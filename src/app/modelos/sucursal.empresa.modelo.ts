export class SucursalEmpresaModelo {
    idSucursal: string;
    idTipoSucursal: string;
    idEmpresa: string;
    nombre: string;
    direccion: string;
    barrio: string;
    telefono: string;
    email: string;
    contacto: string;
    telefonoContacto: string;
    emailContacto: string;
    activo: string;
    usuario: string; 

    constructor(idSucursal?: string,
        idTipoSucursal?: string,
        idEmpresa?: string,
        nombre?: string,
        direccion?: string,
        barrio?: string,
        telefono?: string,
        email?: string,
        contacto?: string,
        telefonoContacto?: string,
        emailContacto?: string,
        activo?: string,
        usuario?: string) {
        this.idSucursal = idSucursal;
        this.idTipoSucursal = idTipoSucursal;
        this.idEmpresa = idEmpresa;
        this.nombre = nombre;
        this.direccion = direccion;
        this.barrio = barrio || "-1";
        this.telefono = telefono;
        this.email = email;
        this.contacto = contacto;
        this.telefonoContacto = telefonoContacto;
        this.emailContacto = emailContacto;
        this.activo = activo;
        this.usuario = usuario;

    }
}
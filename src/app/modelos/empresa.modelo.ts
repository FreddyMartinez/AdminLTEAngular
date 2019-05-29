export class EmpresaModelo {

    idEmpresa: string;
    idCliente: string;
    nombre: string;
    nit: string;
    digitoVerificacion: string;
    contacto: string;
    telefonoContacto: string;
    emailContacto: string;
    activo: string;
    usuario: string; 

    constructor(idEmpresa?: string,
        idCliente?: string,
        nombre?: string,
        nit?: string,
        digitoVerificacion?: string,
        contacto?: string,
        telefonoContacto?: string,
        emailContacto?: string,
        activo?: string,
        usuario?: string) {
        this.idEmpresa = idEmpresa;
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.nit = nit;
        this.digitoVerificacion = digitoVerificacion;
        this.contacto = contacto;
        this.telefonoContacto = telefonoContacto;
        this.emailContacto = emailContacto;
        this.activo = activo;
        this.usuario = usuario;

    }
}
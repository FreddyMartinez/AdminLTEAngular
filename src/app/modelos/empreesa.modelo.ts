export class EmpresaModelo {

    idEmpresa: string;
    idCliente: string;
    nombre: string;
    nit: string;
    digitoVerificacion: string;
    contacto: string;
    telefonoContacto: string;
    emailContacto: string;
    activo: boolean;
    usuario: string; 

    constructor(idEmpresa?: string,
        idCliente?: string,
        nombre?: string,
        nit?: string,
        digitoVerificacion?: string,
        contacto?: string,
        telefonoContacto?: string,
        emailContacto?: string) {
        this.idEmpresa = idEmpresa;
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.nit = nit;
        this.digitoVerificacion = digitoVerificacion;
        this.contacto = contacto;
        this.telefonoContacto = telefonoContacto;
        this.emailContacto = emailContacto;

    }
}
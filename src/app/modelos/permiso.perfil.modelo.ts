export class PermisoPerfilModelo{
    public idPermiso : string;
    public idPerfil : string;
    public nombrePermiso : string;
    public activo : boolean;

    constructor(
         idPerfil ?: string,
         idPermiso ?: string,
         activo ?: boolean
    ){
        this.idPermiso = idPermiso || "-1";
        this.idPerfil = idPerfil || "-1";
        this.activo = activo;
    }
}
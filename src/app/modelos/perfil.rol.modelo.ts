export class PerfilRolModelo {
    public idRol: string;
    public idPerfil: string;
    public nombrePerfil: string;
    public activo: boolean;

    constructor(
        idRol?: string,
        idPerfil?: string,
        activo?: boolean
    ) {
        this.idRol = idRol || "-1";
        this.idPerfil = idPerfil || "-1";
        this.activo = activo;
    }
}
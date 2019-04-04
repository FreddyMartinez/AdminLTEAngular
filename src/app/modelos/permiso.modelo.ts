export class PermisoModelo{
    public id : string;
    public idTipo : string;
    public tag : string;
    public idInterno : string;
    public nombre : string;
    public descripcion : string;
    public ruta : string;
    public icono : string;
    public idGrupo : string;
    public activo : boolean;

    constructor(
         id ?: string,
         idTipo ?: string,
         tag ?: string,
         idInterno ?: string,
         nombre ?: string,
         descripcion ?: string,
         ruta ?: string,
         icono ?: string,
         idGrupo?: string,
         activo ?: boolean
    ){
        this.id = id || "-1";
        this.idTipo = idTipo || "-1";
        this.tag = tag || undefined;
        this.idInterno = idInterno || "-1";
        this.nombre = nombre || undefined;
        this.descripcion = descripcion || undefined;
        this.ruta = ruta || undefined;
        this.icono = icono || undefined;
        this.idGrupo = idGrupo || undefined;
        this.activo = activo;
    }
}
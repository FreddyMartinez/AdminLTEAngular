export class GrupoModelo {
    public id : string;
    public tag : string;
    public nombre : string;
    public descripcion : string;
    public icono : string;
    public idMenu : string;
    public activo : boolean;

    constructor(
         id ?: string,
         tag ?: string,
         nombre ?: string,
         descripcion ?: string,
         icono ?: string,
         idMenu?: string,
         activo ?: boolean
    ){
        this.id = id || "-1";
        this.tag = tag || undefined;
        this.nombre = nombre || undefined;
        this.descripcion = descripcion || undefined;
        this.icono = icono || undefined;
        this.idMenu = idMenu || undefined;
        this.activo = activo;
    }
}
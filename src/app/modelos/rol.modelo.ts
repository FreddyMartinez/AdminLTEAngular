export class RolModelo{
    public id : string;
    public nombre : string;
    public descripcion : string;
    public idCliente : string;
    public activo : boolean;

    constructor(
         id ?: string,
         nombre ?: string,
         descripcion ?: string,
         idCliente ?: string,
         activo ?: boolean
    ){
        this.id = id || "-1";
        this.nombre = nombre || undefined;
        this.descripcion = descripcion || undefined;
        this.idCliente = idCliente || undefined;
        this.activo = activo;
    }
}
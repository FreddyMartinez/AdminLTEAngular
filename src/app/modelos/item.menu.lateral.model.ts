export class ItemMenuLateral{
    public id: number;
    public nombre: string;
    public grupos: GrupoMenuLateral[];
    constructor(
        id: number,
        nombre: string,
        grupos?: GrupoMenuLateral[]
    ){
        this.id = id;
        this.nombre = nombre;
        this.grupos = grupos;
    }
}

export class GrupoMenuLateral{
    public id: number;
    public nombre: string;
    public permisos: PermisoMenuLateral[];
}

export class PermisoMenuLateral{
    public id: number;
    public nombre: string;
    public ruta: string;
}
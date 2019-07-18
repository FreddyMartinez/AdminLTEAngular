export class ParametroConsulta{
    public parametro : string;
    public usuario: string;
    constructor(
        parametro: string,
        usuario?:string
    ){
        this.parametro = parametro;
        this.usuario = usuario;
    }
}
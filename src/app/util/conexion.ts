export class Conexion{
    // public static readonly UrlApi : string = 'http://localhost/wfservicios/';
    public static readonly UrlApi : string = 'http://localhost/SistemaPOS.Servicios/';

    //#region Accesos
    public static readonly versionBack: string = 'Accesos/versionBack';
    public static readonly login : string = 'Accesos/login';
    public static readonly consultarMenuLateral : string = 'Accesos/consultarMenuLateral';
    public static readonly consultarMenu : string = 'Accesos/consultarMenu';
    public static readonly crearMenu : string = 'Accesos/crearMenu';
    public static readonly modificarMenu : string = 'Accesos/modificarMenu';
    public static readonly eliminarMenu : string = 'Accesos/eliminarMenu';
    public static readonly consultarGrupo : string = 'Accesos/consultarGrupo';
    public static readonly crearGrupo : string = 'Accesos/crearGrupo';
    public static readonly modificarGrupo : string = 'Accesos/modificarGrupo';
    public static readonly eliminarGrupo : string = 'Accesos/eliminarGrupo';
    public static readonly consultarPermiso : string = 'Accesos/consultarPermiso';
    public static readonly crearPermiso : string = 'Accesos/crearPermiso';
    public static readonly modificarPermiso : string = 'Accesos/modificarPermiso';
    public static readonly eliminarPermiso : string = 'Accesos/eliminarPermiso';
    public static readonly consultarTiposMenu : string = 'Accesos/consultarTiposMenu';
    public static readonly consultarTiposGrupo : string = 'Accesos/consultarTiposGrupo';
    public static readonly consultarTiposPermiso : string = 'Accesos/consultarTiposPermiso';
    //#endregion
    //#region Usuarios
    public static readonly consultarPerfiles : string = 'Usuarios/consultarPerfiles';
    public static readonly crearPerfil : string = 'Usuarios/crearPerfil';
    public static readonly modificarPerfil : string = 'Usuarios/modificarPerfil';
    public static readonly eliminarPerfil : string = 'Usuarios/eliminarPerfil';
    public static readonly consultarPermisosPerfil : string = 'Usuarios/consultarPermisosPerfil';
    public static readonly crearPermisoPerfil : string = 'Usuarios/crearPermisoPerfil';
    public static readonly modificarPermisoPerfil : string = 'Usuarios/modificarPermisoPerfil';
    public static readonly eliminarPermisoPerfil : string = 'Usuarios/eliminarPermisoPerfil';
    
    public static readonly consultarRoles : string = 'Usuarios/consultarRoles';
    public static readonly crearRol : string = 'Usuarios/crearRol';
    public static readonly modificarRol : string = 'Usuarios/modificarRol';
    public static readonly eliminarRol : string = 'Usuarios/eliminarRol';
    public static readonly consultaClientes : string = 'Usuarios/consultaClientes';
    public static readonly consultarPerfilesRol : string = 'Usuarios/consultarPerfilesRol';
    public static readonly crearPerfilRol : string = 'Usuarios/crearPerfilRol';
    public static readonly modificarPerfilRol : string = 'Usuarios/modificarPerfilRol';
    public static readonly eliminarPerfilRol : string = 'Usuarios/eliminarPerfilRol';
    public static readonly cambioClave : string ='Usuarios/cambioClave';

    public static readonly consultarUsuarios : string = 'Usuarios/consultarUsuarios';
    public static readonly crearUsuario : string = 'Usuarios/crearUsuario';
    public static readonly modificarUsuario : string = 'Usuarios/modificarUsuario';
    public static readonly eliminarUsuario : string = 'Usuarios/eliminarUsuario';

    public static readonly consultarTiposRol : string = 'Usuarios/consultarTiposRol';
    public static readonly consultarTiposDocumento : string = 'Usuarios/consultarTiposDocumento';
    //#endregion

    //#region Clientes
    public static readonly consultarClientes : string = 'Cliente/consultarClientes';
    public static readonly crearCliente : string = 'Cliente/crearCliente';
    public static readonly editarCliente : string = 'Cliente/editarCliente';
    public static readonly eliminarCliente : string = 'Cliente/eliminarCliente';
    public static readonly consultarClientePrincipal : string = 'Cliente/consultarClientePrincipal';
    public static readonly consultarClienteReferidor : string = 'Cliente/consultarClienteReferidor';

    public static readonly consultarUsuariosCliente : string = 'Cliente/consultarUsuarios';
    //#endregion

    //#region Empresas
    public static readonly consultarEmpresas : string = 'Empresas/consultarEmpresas';
    public static readonly crearEmpresas : string = 'Empresas/crearEmpresa';
    public static readonly editarEmpresas : string = 'Empresas/editarEmpresa';
    public static readonly eliminarEmpresas : string = 'Empresas/eliminarEmpresa';
    //#endregion

    //#region SucursalEmpresas 
    public static readonly consultarSucursalEmpresas : string = 'Empresas/consultarSucursalEmpresas';
    public static readonly crearSucursalEmpresa : string = 'Empresas/crearSucursalEmpresa';
    public static readonly editarSucursalEmpresa : string = 'Empresas/editarSucursalEmpresa';
    public static readonly eliminarSucursalEmpresa : string = 'Empresas/eliminarSucursalEmpresa';
    public static readonly consultarTipoSucursal : string = 'Empresas/consultarTipoSucursal';
    //#endregion

    //#region CarguesMasivos
    public static readonly obtenerCarguesMasivos : string = 'CarguesMasivos/ObtenerCarguesMasivos';
    public static readonly obtenerCarguesMasivosDet : string = 'CarguesMasivos/ObtenerCarguesMasivosDet';
    public static readonly crearNuevoCargueMasivo : string = 'CarguesMasivos/CrearNuevoCargueMasivo';
    //#endregion
}
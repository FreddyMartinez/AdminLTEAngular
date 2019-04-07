import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition} from '@angular/animations';
import { ModalDirective } from 'ngx-bootstrap';
import { RolModelo } from 'src/app/modelos/rol.modelo';
import { UsuariosServicios } from 'src/app/servicios/usuarios.servicio';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constantes } from 'src/app/util/constantes';
import { ModeloGenerico } from 'src/app/modelos/modelo.generico';
import { ParametroConsulta } from 'src/app/modelos/parametro.consulta.modelo';
import { PerfilRolModelo } from 'src/app/modelos/perfil.rol.modelo';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0, height: '0px' }))
      ])
    ])
  ]
})
export class RolComponent implements OnInit {
  
  @ViewChild('modalEliminar') modalEliminar: ModalDirective;
  @ViewChild('modalPerfiles') modalPerfiles: ModalDirective;
  public tipoForm : string;
  public listaRol : RolModelo[];
  public itemRol : RolModelo;
  public itemEliminar : RolModelo;
  public editarItem : boolean;
  public listaClientes : ModeloGenerico[];
  public listaPerfilesRol : PerfilRolModelo[];

  constructor(
    public servicio: UsuariosServicios,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { 
  }

  ngOnInit() {
    this.ConsultaListaRoles();
    this.ConsultaIdClientes();
  }

  ConsultaListaRoles(){
    this.spinner.show();
    this.servicio.ConsultarRoles().subscribe(
      data=>{
        this.spinner.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaRol = data[Constantes.objetoRespuesta] as RolModelo[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  ConsultaIdClientes(){
    this.servicio.ConsultaClientes().subscribe(
      data=>{
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.listaClientes = data[Constantes.objetoRespuesta] as ModeloGenerico[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }  

  NuevoItem(){
    this.editarItem = false;
    this.tipoForm = "creación de rol";
    this.itemRol = new RolModelo();
  }

  CargarItem(item: RolModelo){
    this.editarItem = true;
    this.tipoForm = "modificación del rol";
    this.itemRol = item;
  }

  CancelaItem(){
    this.itemRol = undefined;
  }

  AbreModal(item: RolModelo){
    this.modalEliminar.show();
    this.itemEliminar = item;
  }

  EliminarRol(){
    this.spinner.show();
    this.servicio.EliminarRol(this.itemEliminar).subscribe(
      data=>{
        this.spinner.hide();
        this.modalEliminar.hide();
        if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
          this.itemRol = undefined;
          this.toastr.success(data[Constantes.objetoRespuesta] as string);
          this.ConsultaListaRoles();
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  HabilitaGuardar(){
    if(this.itemRol.nombre != undefined && this.itemRol.nombre != ""
    && this.itemRol.descripcion != undefined && this.itemRol.descripcion != ""){
      return true;
    }else{
      return false;
    }
  }

  GuardarRol(){
    this.spinner.show();
    if(this.editarItem){
      this.servicio.ModificarRol(this.itemRol).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemRol = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.ConsultaListaRoles();
          }
        },
        error=>{
          this.MuestraError(error);
        }
      );
    }else{
      this.servicio.CrearRol(this.itemRol).subscribe(
        data=>{
          this.spinner.hide();
          if (data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta) {
            this.itemRol = undefined;
            this.toastr.success(data[Constantes.objetoRespuesta] as string);
            this.ConsultaListaRoles();
          }
        },
        error=>{
          this.MuestraError(error);
        }
      );
    }
  }

  MuestraPerfiles(idRol: string){
    this.spinner.show();
    let perfil : ParametroConsulta = new ParametroConsulta(idRol);
    this.servicio.ConsultarPerfilesRol(perfil).subscribe(
      data=>{
        this.spinner.hide();
        if(data[Constantes.codigoRespuesta] == Constantes.respuestaCorrecta){
          this.modalPerfiles.show();
          this.listaPerfilesRol = data[Constantes.objetoRespuesta] as PerfilRolModelo[];
        }
      },
      error=>{
        this.MuestraError(error);
      }
    );
  }

  GuardaPerfiles(){
    this.listaPerfilesRol.forEach(permiso => {
      this.servicio.ModificarPerfilRol(permiso).subscribe(
        data=>{},
        error=>{
          this.MuestraError(error);
        }
      );
    });
    this.modalPerfiles.hide();
  }

  MuestraError(error: any) {
    this.spinner.hide();
    if (error[Constantes.statusError] == 0) {
      this.toastr.error(Constantes.connectionError, Constantes.tituloError);
    } else {
      this.toastr.error(error[Constantes.mensajeError][Constantes.mensajeRespuesta], Constantes.tituloError);
    }
  }
}


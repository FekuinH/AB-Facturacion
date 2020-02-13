import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../Cliente';
import { ClienteService } from '../cliente.service';
import {ModalService} from '../detalles/modal.service';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/usuarios/auth.service';
import { FacturasService } from 'src/app/facturas/services/facturas.service';
import { Factura } from 'src/app/facturas/models/factura';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  title: String = "Detalles completos";
  @Input()
  cliente: Cliente;
  public fotoSeleccionada: File;
  urlBackend: String = URL_BACKEND;

  constructor(
    private clienteService: ClienteService,
    public modalService: ModalService,
    public authService: AuthService,
    private facturaService: FacturasService
  ) { }

  ngOnInit() {

/* 
    this.activatedRoute.paramMap.subscribe(idParametro => {
      let id: number = +idParametro.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe(clienteResponse => {
        this.cliente = clienteResponse;
        });

      };

    }
    ); */
  }

  seleccionarFoto(event){
    this.fotoSeleccionada= event.target.files[0];
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf("image") < 0 ){
      swal('Error al seleccionar la imagen:','El tipo seleccionado debe ser una foto', 'error');
    }
  }

  subirFoto(){

    if(!this.fotoSeleccionada){
      swal('Error al subir la imagen:', 'Debe seleccionar una foto','error')
    }else{

    
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.idCliente).
    subscribe(cliente =>{
      this.cliente = cliente;

      this.modalService.notificarUpload.emit(this.cliente);
      swal('Foto cargada','La foto se ha subido correctamente','success');
    });
  }
  }
  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
  }

  deleteFactura(factura: Factura){
    (swal as any).fire({
      title: 'Esta seguro?',
      text: "Desea eliminar la factura?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.facturaService.delete(factura.id).subscribe(
          response => {
            this.cliente.facturas = this.cliente.facturas.filter(f => f !== factura);
            (swal as any).fire(
              'Factura eliminada',
              `${factura.descripcion}, ha sido borrada`,
              'success'
            )
          }
        )

      }
    })
  }
}

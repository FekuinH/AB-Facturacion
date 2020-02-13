import { Component, OnInit } from '@angular/core';
import { Cliente } from './Cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalles/modal.service';
import { AuthService } from '../usuarios/auth.service';
import { URL_BACKEND } from '../config/config';




@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',

})
export class ClientesComponent implements OnInit {


  clientesLista: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;
  urlBackend: String = URL_BACKEND;


  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    public modalService: ModalService,
    public authService: AuthService
  ) {

  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page).subscribe(
        clientesJsonResponse => {
          this.clientesLista = clientesJsonResponse.content;
          this.paginador = clientesJsonResponse;
        }
      );

    });

    this.modalService.notificarUpload.subscribe(cliente => {
      this.clientesLista = this.clientesLista.map(clienteOriginal => {
        if (cliente.idCliente == clienteOriginal.idCliente) {
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      })
    });
  }




  public eliminar(cliente: Cliente): void {
    (Swal as any).fire({
      title: 'Esta seguro?',
      text: "Desea eliminar al cliente?!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.clienteService.eliminarCliente(cliente.idCliente).subscribe(
          response => {

            this.clientesLista = this.clientesLista.filter(cli => cli !== cliente);
            (Swal as any).fire(
              'Borrado!',
              'El cliente ha sido borrado.',
              'success'
            )
          }
        )

      }
    })
  }


  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}

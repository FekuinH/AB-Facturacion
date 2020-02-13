import { Component, OnInit } from '@angular/core';
import { Cliente } from './Cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from './region';

@Component({
  selector: 'app-formulario-clientes',
  templateUrl: './formulario-clientes.component.html'
})
export class FormularioClientesComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  title: string = "Nuevo cliente";
  public errores: string[];
  regiones: Region[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
    this.clienteService.getRegiones().subscribe(regionesResponse => this.regiones = regionesResponse);
  }

  public agregarCliente(): void {

    this.clienteService.agregarCliente(this.cliente)
      .subscribe(response => {
        this.router.navigate(['/clientes'])
        swal('Nuevo cliente', `Cliente ${response.cliente.nombre} creado con exito`, 'success')

      },
        err => {
          this.errores = err.error.errors as string[];
        }
      );
  }

  public cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']

      if (id) {
        this.clienteService.getCliente(id).subscribe(
          (clienteResponse) => this.cliente = clienteResponse)
      }

    });
  }

  public actualizarCliente(): void {

    this.cliente.facturas = null;
    this.clienteService.editarCliente(this.cliente).
      subscribe(
        clienteResponse => {
          this.router.navigate(['/clientes'])
          console.log(clienteResponse)
          swal('Cliente actualizado', 'Cliente actualizado con exito', "success");
        },
        err => {
          this.errores = err.error.errors as string[];
        }
      );
  }

  public compararRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }

}

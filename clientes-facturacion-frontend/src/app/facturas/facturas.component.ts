import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes/Cliente';
import { Factura } from './models/factura';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, flatMap } from 'rxjs/operators';
import { FacturasService } from './services/facturas.service';
import { Producto } from './models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ItemFactura } from './models/item-factura';
import swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
})
export class FacturasComponent implements OnInit {

  title: string = "Nueva factura"
  factura: Factura = new Factura();
  autoCompleteControl = new FormControl();
  productos: string[] = [];
  productosFiltrados: Observable<Producto[]>;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute, private facturaService: FacturasService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(clienteResponse => {
        this.factura.cliente = clienteResponse;
      });
    });

    this.productosFiltrados = this.autoCompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filter(value) : [])
      );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.buscarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {

    let producto = event.option.value as Producto;

    if (this.existeItem(producto.id)) {
      this.incrementarCantidad(producto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }


    console.log(this.factura.items[0]);
    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event: any) {
    let cantidad: number = event.target.value as number;

    if (cantidad == 0) {
      return this.eliminarItem(id);
    }

    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (item.producto.id === id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.factura.items.forEach((item: ItemFactura) => {
      if (item.producto.id === id) {
        existe = true;
      }

    });
    return existe;
  }

  incrementarCantidad(id: number) {


    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (item.producto.id === id) {
        ++item.cantidad
      }
      return item;
    });
  }

  eliminarItem(id: number): void {

    console.log(id);
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id !== item.producto.id);
  }


  create(facturaForm): void {

    if (this.factura.items.length == 0) {
      this.autoCompleteControl.setErrors({ 'invalid': true });
    }

    if (facturaForm.form.valid && this.factura.items.length > 0) {
      this.facturaService.create(this.factura).subscribe(facturaResponse => {
        swal('Nueva factura', 'Se ha creado la factura correctamente', 'success');
        this.router.navigate(['/clientes']);
      });
    }
  }




}

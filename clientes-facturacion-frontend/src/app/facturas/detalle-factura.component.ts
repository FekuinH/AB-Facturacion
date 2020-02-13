import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { FacturasService } from './services/facturas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html' 

})
export class DetalleFacturaComponent implements OnInit {

  factura: Factura;
  titulo: string = "Detalles de la factura";
  
  constructor(private facturaService: FacturasService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

     this.activatedRoute.paramMap.subscribe(params =>{
      let id = +params.get('id');
      if(id){
        this.facturaService.getFactura(id).subscribe( facturaResponse =>{
          
          this.factura = facturaResponse;
        });
      }
    });

    

  }

}

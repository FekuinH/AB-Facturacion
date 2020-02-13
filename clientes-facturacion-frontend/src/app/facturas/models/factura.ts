import { ItemFactura } from './item-factura';
import { Cliente } from 'src/app/clientes/Cliente';

export class Factura {

    id: number;
    descripcion: string;
    items: ItemFactura[] = [];
    cliente: Cliente;
    total: number;
    fechaCreacion: string;

    calcularTotal() {
        this.total = 0;

        this.items.forEach((item: ItemFactura) => {
            
            this.total += item.getImporte();
        });

        return this.total;
    }

}

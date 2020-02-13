import { Region } from './region';
import { Factura } from '../facturas/models/factura';

export class Cliente{

    idCliente: number;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    telefono: string;
    fechaIngreso: string;
    foto: string;
    region: Region;
    facturas: Factura[] = [];

}
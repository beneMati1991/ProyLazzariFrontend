export class Producto {
  nombre: string = '';
  marca: string = '';
  unidadMedidaId: number = 0;
  cantidad: number = 0;
  detalle: string = '';
  precio: number = 0;
  imagen: string = '';
  sucursalId: number = 0;
}

class PeroductoConId extends Producto {
  id?: number = 0;
}

export interface IProduct {
  nombre: string;
  marca: string;
  detalle: string;
  cantidad: number;
  precio: number;
  unidadDeMedida: string;
  imagen: string;
  accion?: any;
}

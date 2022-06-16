import { Domicilio } from './domicilio.model';

export class Comercio {
  nombre: string = '';
  razonSocial: string = '';
  cuit: string = '';
  email: string = '';
  nombreContacto: string = '';
  telefonoContacto: number = 0;
  usuarioId: number = 0;
  activo: number = 0;
}

class ComercioConId extends Comercio {
  id?: number = 0;
}
export class AltaComercio {
  nombre: string = '';
  razonSocial: string = '';
  cuit: string = '';
  domicilio: Domicilio = new Domicilio();
  email: string = '';
  nombreContacto: string = '';
  telefono: number = 0;
  nombreUsuario: string = '';
  password: string = '';
}

export interface ComercioObject {
  nombreDeUsuario: string;
  nombre: string;
  razonSocial: string;
  cuit: string;
  nombreContacto: string;
  email: string;
  telefono: number;
  domicilio: Domicilio;
}

export interface ComercioAltaObject {
  nombreUsuario: string;
  password: string;
  nombre: string;
  nombreContacto: string;
  razonSocial: string;
  cuit: string;
  email: number;
  telefono: number;
  domicilio: Domicilio;
}

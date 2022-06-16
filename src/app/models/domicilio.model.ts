export class Domicilio {
  provincia: string = '';
  municipio: string = '';
  localidad: string = '';
  calle: string = '';
  altura: number = 0;
}

export interface Provincia {
  id: number;
  nombre: string;
}

export interface Localidad {
  id: number;
  nombre: string;
  provincia: Provincia;
}

export interface Municipio {
  id: number;
  nombre: string;
}

export interface IDomicilio {
  provincia: string;
  municipio: string;
  localidad: string;
  calle: string;
  altura: number;
}

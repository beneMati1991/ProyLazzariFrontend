export class Sucursal {
    nombre : string='';
    direccion : string='';
    coordenadas: string='';
    telefono : number=0;
    email : string='';
    comercioId : number=0;
    activo : number=0;
}

class SucursalConId extends Sucursal {

    id?: number=0;
}


      
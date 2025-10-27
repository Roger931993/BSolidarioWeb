export interface Cliente {
  cliente_id: number;
  primer_nombre: string;
  segundo_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  identificacion: string;
  username: string;
  contacto: [];
}

export interface CreateCliente extends Omit<Cliente, "cliente_id"> {}

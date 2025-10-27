import { Cuenta } from "@web/core/models/cuenta.model";
import { Cliente } from "@web/core/models/cliente.model";

export interface ClienteCuentas {
  cliente: Cliente;
  cuentas: Cuenta[];
}

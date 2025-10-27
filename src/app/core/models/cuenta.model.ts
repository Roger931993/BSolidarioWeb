export interface Cuenta {
  cuenta_id: number;
  cliente_id?: number;
  producto_id?: number;
  agencia_id?: number;

  numero_cuenta: string;
  moneda: string;
  tipo_cuenta: string;
  fecha_apertura: string;
  fecha_cierre: string;
  saldo_actual: number;
  saldo_disponible: number;
  tasa_interes: number;
  fecha_ultima_transaccion: string;
  usuario_creacion: string;
  det_producto: string;
}

export interface CreateCuenta {
  cuenta_id: number;
  cliente_id: number;
  moneda: string;
  monto: number;
}

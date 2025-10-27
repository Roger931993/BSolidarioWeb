import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@web/../environments/environment";
import { firstValueFrom, Observable, of } from "rxjs";
import { Cliente } from "@web/core/models/cliente.model";
import { ClienteCuentas } from "@web/core/models/cliente.cuentas.model";
import { Cuenta } from "@web/core/data/cuenta";

@Injectable({
  providedIn: "root",
})
export class CuentaService {
  private http = inject(HttpClient);

  constructor() {}

  url_get: string = environment.apiUrl + "/api/Cliente/cuentas";
  url_get_by_id: string =
    environment.apiUrl + "/api/Cliente/cliente/{id}/cuentas";

  Data: ClienteCuentas[] = Cuenta;

  get(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url_get_by_id);
  }

  async getAsync(): Promise<Cliente[]> {
    return await firstValueFrom(this.get());
  }

  getById(ID: number): Observable<ClienteCuentas> {
    const data: ClienteCuentas = this.Data[0];

    // return this.http.get<ClienteCuentas>(
    //   this.url_get_by_id.replace("{id}", ID.toString())
    // );

    return of(data);
  }

  async getByIdAsync(ID: number): Promise<ClienteCuentas> {
    return await firstValueFrom(this.getById(ID));
  }
}

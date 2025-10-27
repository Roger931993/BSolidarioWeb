import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@web/../environments/environment";
import { firstValueFrom, Observable } from "rxjs";
import { Cliente, CreateCliente } from "@web/core/models/cliente.model";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  private http = inject(HttpClient);

  constructor() {}

  url_get: string = environment.apiUrl + "/api/Cliente/Clientes";
  url_delete: string = environment.apiUrl + "/api/Cliente/Clientes";
  url_post: string = environment.apiUrl + "/api/Cliente/Clientes";
  url_update: string = environment.apiUrl + "/api/Cliente/Clientes";

  get(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url_get);
  }

  async createAsync(data: CreateCliente): Promise<Cliente> {
    return firstValueFrom(this.create(data));
  }

  create(data: CreateCliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url_post, data);
  }

  delete(ID: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.url_delete}/${ID}`);
  }

  async getAsync(): Promise<Cliente[]> {
    return await firstValueFrom(this.get());
  }

  async updateAsync(Id: number, data: CreateCliente): Promise<Cliente> {
    return firstValueFrom(this.update(Id, data));
  }

  update(Id: number, data: CreateCliente) {
    return this.http.put<any>(`${this.url_update}/${Id}`, data);
  }

  async deleteAsync(ID: number): Promise<Cliente> {
    return await firstValueFrom(this.delete(ID));
  }
}

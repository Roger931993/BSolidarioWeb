import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
export class FunctionUrl {
  private route = inject(ActivatedRoute);
  constructor() {}

  getParam(paramName: string): Observable<string | null> {
    return this.route.paramMap.pipe(map((params) => params.get(paramName)));
  }

  static slugify(text: string): string {
    return text
      ? text
          .toLowerCase()
          .normalize('NFD') // separa acentos
          .replace(/[\u0300-\u036f]/g, '') // elimina los acentos
          .replace(/[^a-z0-9 -]/g, '') // elimina caracteres especiales
          .replace(/\s+/g, '-') // reemplaza espacios por guiones
          .replace(/-+/g, '-') // elimina guiones repetidos
          .replace(/^-+|-+$/g, '')
      : ''; // elimina guiones al inicio/fin
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private requestCount = 0; // Lleva el control de las solicitudes activas

  constructor(private spinnerService: NgxSpinnerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Si el header "X-Skip-Spinner" está presente, omitir el spinner
    if (request.headers.has('X-Skip-Spinner')) {
      const modifiedRequest = request.clone({
        headers: request.headers.delete('X-Skip-Spinner'), // Eliminar el header antes de enviar la petición
      });
      return next.handle(modifiedRequest);
    }

    if (this.requestCount === 0) {
      this.spinnerService.show(); // Mostrar spinner si es la primera solicitud
    }
    this.requestCount++;

    return next.handle(request).pipe(
      finalize(() => {
        this.requestCount--; // Reducir el contador al finalizar
        if (this.requestCount === 0) {
          this.spinnerService.hide(); // Ocultar spinner cuando no haya solicitudes activas
        }
      })
    );
  }
}

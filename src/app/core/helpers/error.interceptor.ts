import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { AuthenticationService } from '../services/auth.service';
import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';
import { ToastrService } from 'ngx-toastr';
import { MattermostLoggerService } from '@web/core/services/mattermost-logger.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private authenticationService = inject(AuthenticationService);
  private authFackservice = inject(AuthfakeauthenticationService);
  // private authenticationService = inject(AuthenticationService);
  private toastr = inject(ToastrService);
  private logger = inject(MattermostLoggerService);

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.logger.sendError(err.message || 'Error desconocido', {
          stack: err.stack,
        });

        // console.log(err);
        if (err.status === 401) {
          this.authFackservice.logout();
          location.reload();
        }

        // console.log(err);
        if (err.status === 403) {
          this.toastr.error(
            `Credenciales incorrectas!!!! requiere permisos para ejecutar esta solicitud`,
            `Login (Code: ${err?.error?.codeError ?? err.status})`
          );
        }

        if (err.status >= 500 && err.status <= 599) {
          // console.log(err);
          switch (err.error.messageError) {
            case 'INVALID_LOGIN_CREDENTIALS':
              this.toastr.error(
                `Credenciales incorrectas!!!!`,
                `Login (Code: ${err.error.codeError ?? err.error.status})`
              );
              break;
            default:
              this.toastr.error(
                `${
                  err.error.messageError ??
                  err.error.ExceptionMessage + ' | ' + err.error?.InnerException
                }`,
                `${err.statusText} (Code: ${
                  err.error.codeError ?? err.error.status
                })`
              );
          }
        }

        const error = err?.error?.message || err.statusText;
        return throwError(error);
      })
    );
  }
}

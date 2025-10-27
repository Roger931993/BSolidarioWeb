import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';
import { environment } from '@web/../environments/environment';
import { Login, User } from '@web/store/Authentication/auth.models';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private authfackservice: AuthfakeauthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (environment.defaultauth === 'firebase') {
      // add authorization header with jwt token if available
      // let currentUser = this.authenticationService.currentUser();
      // if (currentUser && currentUser.access_token) {
      //   request = request.clone({
      //     setHeaders: {
      //       Authorization: `Bearer ${currentUser.access_token}`,
      //     },
      //   });
      // }
    } else {
      // add authorization header with jwt token if available
      const token: Login = this.authfackservice.currentUserValue;
      const accessToken: string = this.authfackservice.accessTokenValue;

      if (accessToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `${token.token_type} ${accessToken}`,
          },
        });
      }
    }
    return next.handle(request);
  }
}

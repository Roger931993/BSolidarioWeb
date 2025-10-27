import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { User, Login } from "@web/store/Authentication/auth.models";
import { environment } from "@web/../environments/environment";
import * as jwt_decode from "jwt-decode";

@Injectable({ providedIn: "root" })
export class AuthfakeauthenticationService {
  private currentUserSubject: BehaviorSubject<Login>;
  private access_token: BehaviorSubject<string>;
  public currentUser: Observable<Login>;
  private url = environment.apiAuthUrl + "/api/oauth/token";

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Login>(
      JSON.parse(localStorage.getItem("currentUser"))
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Login {
    return this.currentUserSubject.value;
  }

  public get accessTokenValue(): string {
    return this.currentUserSubject?.value?.access_token;
  }

  public get loginTokenValue(): {} {
    return jwt_decode.jwtDecode(this.currentUserSubject.value?.login_token);
  }

  public get userTokenValue(): User {
    return jwt_decode.jwtDecode(this.currentUserSubject.value?.user_token);
  }

  login(email: string, password: string) {
    let params = new HttpParams();
    params = params.append("username", email);
    params = params.append("password", password);
    params = params.append(
      "client_id",
      environment.fakebackendConfig.client_id
    );
    params = params.append(
      "client_secret",
      environment.fakebackendConfig.client_secret
    );
    params = params.append(
      "grant_type",
      environment.fakebackendConfig.grant_type
    );

    params = params.append("scope", environment.fakebackendConfig.scope);

    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });

    return this.http.post<any>(this.url, params, { headers }).pipe(
      map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (user && user.access_token) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "Ocurrió un error desconocido";

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error del servidor: ${error.status}\nMensaje: ${error.message}`;
    }

    // Mostrar el error en la consola (opcional)
    console.error(errorMessage);

    // Devolver un observable con un mensaje de error
    return throwError(errorMessage);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}

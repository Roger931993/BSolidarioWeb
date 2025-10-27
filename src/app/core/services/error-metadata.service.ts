import { Injectable, ErrorHandler } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ErrorMetadataService implements ErrorHandler {
  public handleError(error: any): void {
    console.error(`ERROR:BSolidario `, error);
  }
}

import { FormGroup } from '@angular/forms';

export function formErrorLogs(form: FormGroup): void {
  Object.keys(form.controls).forEach((key) => {
    const controlErrors = form.get(key)?.errors;
    if (controlErrors) {
      console.log(`Errores en el campo ${key}:`, controlErrors);
    }
  });
}

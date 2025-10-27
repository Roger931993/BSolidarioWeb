import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function decimalValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const regex = /^\d+(\.\d+)?$/; // Expresión regular para números decimales

    if (value === null || value === '') {
      return null; // Permitir campos vacíos si no se requiere
    }

    return regex.test(value) ? null : { invalidDecimal: true };
  };
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const regex = /^\d+$/; // Expresión regular para solo números
    if (value === null || value === '') {
      return null; // Permitir campos vacíos si no se requiere
    }
    return regex.test(value) ? null : { invalidNumber: true };
  };
}

export function is_number(val) {
  if (val || val === 0) {
    return true;
  } else {
    return false;
  }
}

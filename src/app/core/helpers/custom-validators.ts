import {
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { co } from '@node_modules/@fullcalendar/core/internal-common';
import { Observable, Observer } from 'rxjs';

export class CustomValidators {
  // Puedes agregar más validadores aquí
  static decimal(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const regex = /^\d+(\.\d+)?$/; // Expresión regular para números decimales

      if (value === null || value === '') {
        return null; // Permitir campos vacíos si no se requiere
      }

      return regex.test(value) ? null : { invalidDecimal: true };
    };
  }

  static mimeType = (
    control: FormControl
  ): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
    const file = control.value as File;
    console.log(file, control);
    const fileReader = new FileReader();
    const frObs = new Observable(
      (observer: Observer<{ [key: string]: any }>) => {
        fileReader.onload = () => {
          let header = '';
          let isValid = false;

          const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(
            0,
            4
          );

          // Convert the header to hexadecimal string
          for (let i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
          }
          // Check for common image headers
          const validHeaders = [
            '89504e47', // PNG
            'ffd8ffe0', // JPG
            'ffd8ffe1', // JPG
            'ffd8ffe2', // JPG
            'ffd8ffe3', // JPG
            'ffd8ffe8', // JPG
          ];
          isValid = validHeaders.some((validHeader) =>
            header.startsWith(validHeader)
          );
          if (isValid) {
            observer.next(null!);
          } else {
            observer.next({ invalidMimeType: true });
          }

          observer.complete();
        };

        fileReader.readAsArrayBuffer(file);
      }
    );

    return frObs;
  };

  static numeric(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const regex = /^\d+$/; // Expresión regular para solo números
      if (value === null || value === '') {
        return null; // Permitir campos vacíos si no se requiere
      }
      return regex.test(value) ? null : { invalidNumber: true };
    };
  }

  static is_number(val) {
    if (val || val === 0) {
      return true;
    } else {
      return false;
    }
  }

  static requiredIfTrue(triggerField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) return null;

      const trigger = control.parent.get(triggerField);
      if (!trigger) return null;

      const triggerValue = trigger.value;
      const controlValue = control.value;

      if (triggerValue && !controlValue) {
        return { requiredIf: true };
      }

      return null;
    };
  }

  static requiredIfFalse(triggerField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) return null;

      const trigger = control.parent.get(triggerField);
      if (!trigger) return null;

      const triggerValue = trigger.value;
      const controlValue = control.value ?? false;

      console.log('Custom-Validators.requiredIfFalse');
      console.log('TriggerField', trigger, ' | ', triggerValue);
      console.log('Control:', control), '|', controlValue;

      if (triggerValue === false && !controlValue) {
        console.log('requiredIfNot');
        return { requiredIfNot: true };
      }

      return null;
    };
  }
}

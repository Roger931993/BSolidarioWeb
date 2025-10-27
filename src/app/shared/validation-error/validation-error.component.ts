import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="shouldShowError()" class="text-danger text-start">
      <ng-container *ngIf="control.errors">
        <small *ngIf="control.errors['required']">Campo requerido</small>

        <small *ngIf="control.errors['minlength']">
          Mínimo
          {{ control.errors['minlength'].requiredLength }} caracteres
        </small>

        <small *ngIf="control.errors['maxlength']">
          Máximo
          {{ control.errors['maxlength'].requiredLength }} caracteres
        </small>

        <small *ngIf="control.errors['invalidNumber']">
          Número incorrecto, solo se aceptan valores enteros
        </small>

        <small *ngIf="control.errors['invalidDecimal']">
          @if(!message) {
          <span>Número incorrecto, solo se aceptan valores decimales</span>
          <span class="text-danger">solo (.) decimal</span>
          } @else {
          {{ message }}
          }
        </small>

        <small *ngIf="control.errors['email']">Email incorrecto</small>

        <small *ngIf="control.errors['pattern']">
          {{ message }}
        </small>

        <small *ngIf="control.errors['requiredIf']">
          {{ message }}
        </small>
        <small *ngIf="control.errors['requiredIfNot']">
          {{ message }}
        </small>
      </ng-container>
    </div>
  `,
})
export class ValidationErrorComponent {
  @Input() control!: AbstractControl;
  @Input() typesubmit: boolean = false;
  @Input() message: string | null = null;

  shouldShowError(): boolean {
    return (
      this.control &&
      this.control.invalid &&
      (this.typesubmit || this.control.dirty || this.control.touched)
    );
  }
}

// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from '@web/core/directive/has-permission.directive';
import { HasFieldInvoiceDirective } from '@web/core/directive/has-field-invoice.directive';

@NgModule({
  declarations: [HasPermissionDirective, HasFieldInvoiceDirective],
  imports: [CommonModule],
  exports: [HasPermissionDirective, HasFieldInvoiceDirective],
})
export class SharedModule {}

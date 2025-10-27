import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';

import { WidgetModule } from './widget/widget.module';
import { ValidationErrorComponent } from './validation-error/validation-error.component';

@NgModule({
  declarations: [
    ValidationErrorComponent
  ],
  imports: [CommonModule, UIModule, WidgetModule],
})
export class SharedModule {}

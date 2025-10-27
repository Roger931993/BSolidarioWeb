import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  Fields,
  FormCountryConfigService,
} from '@web/core/services/app/form-country-config.service';

interface FieldDirective {
  fields: Fields[] | null;
  field: string;
}

@Directive({
  selector: '[appHasFieldInvoice]',
  // standalone: true
})
export class HasFieldInvoiceDirective {
  private formCountryConfigService = inject(FormCountryConfigService);
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);

  @Input() set appHasFieldInvoice(data: FieldDirective) {
    if (data.fields) {
      const field = data.fields.find((item) => {
        return item.name == data.field;
      });

      if (field || data.fields.length == 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }
  }

  constructor() {}
}

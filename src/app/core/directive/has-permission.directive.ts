import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { PermissionsCacheService } from '@web/core/services/app/cache/permissions-cache.service';

@Directive({
  selector: '[appHasPermission]',
  // standalone: true,
})
export class HasPermissionDirective {
  private servicePermission = inject(PermissionsCacheService);
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  @Input() set appHasPermission(permission: string) {
    if (permission) {
      this.servicePermission
        .getPermissionByNameorPath(permission)
        .then((status) => {
          // console.log(permission, status, this.templateRef);
          if (status) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
        });
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  constructor() {}
}

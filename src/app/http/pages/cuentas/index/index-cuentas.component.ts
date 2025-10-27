import { Component } from "@angular/core";
import { DataCuentasComponent } from "@web/http/pages/cuentas/data/data-cuentas.component";

@Component({
  selector: "app-index-cuentas",
  templateUrl: "./index-cuentas.component.html",
  styleUrl: "./index-cuentas.component.css",
})
export class IndexCuentasComponent {
  breadCrumbItems: Array<{}>;

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Inicio" },
      { label: "Cuentas", active: true },
    ];
  }
}

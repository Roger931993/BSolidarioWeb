import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { IndexClientComponent } from "@web/http/pages/client/index/index-client.component";
import { IndexCuentasComponent } from "@web/http/pages/cuentas/index/index-cuentas.component";

const routes: Routes = [
  {
    path: "",
    component: IndexClientComponent,
    data: {
      name: "implement.cliente.data",
      parent_path: "implement",
    },
  },
  {
    path: "cliente/cuenta/:id",
    component: IndexCuentasComponent,
    data: {
      name: "implement.cliente.cuenta.data",
      parent_path: "implement",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

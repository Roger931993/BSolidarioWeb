import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MaintenanceComponent } from "./maintenance/maintenance.component";
import { Page404Component } from "./page404/page404.component";
import { Page500Component } from "./page500/page500.component";
// import { LoginComponent } from '@web/http/account/auth/login/login.component';

const routes: Routes = [
  {
    path: "maintenance",
    component: MaintenanceComponent,
  },
  {
    path: "404",
    component: Page404Component,
  },
  {
    path: "500",
    component: Page500Component,
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtrapagesRoutingModule {}

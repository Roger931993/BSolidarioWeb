import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// Modules
import { AuthGuard } from "./core/guards/auth.guard";
import { LayoutComponent } from "./layouts/layout.component";
import { Page404Component } from "./http/pages/extrapages/page404/page404.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    loadChildren: () =>
      import("./http/pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "pages",
    loadChildren: () =>
      import("./http/pages/extrapages/extrapages.module").then(
        (m) => m.ExtrapagesModule
      ),
    canActivate: [AuthGuard],
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TabsModule } from "ngx-bootstrap/tabs";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { AlertModule } from "ngx-bootstrap/alert";
import { FullCalendarModule } from "@fullcalendar/angular";
import { SimplebarAngularModule } from "simplebar-angular";
import { LightboxModule } from "ngx-lightbox";

import { WidgetModule } from "@web/shared/widget/widget.module";
import { UIModule } from "@web/shared/ui/ui.module";

import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";

// Emoji Picker
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { PagesRoutingModule } from "./pages-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { HighchartsChartModule } from "highcharts-angular";
import { Select2Module } from "@node_modules/ng-select2-component";

import { ClienteService } from "@web/core/services/app/cliente.service";
import { CuentaService } from "@web/core/services/app/cuenta.service";
import { IndexClientComponent } from "@web/http/pages/client/index/index-client.component";
import { DataClientComponent } from "@web/http/pages/client/data/data-client.component";

import { IndexCuentasComponent } from "@web/http/pages/cuentas/index/index-cuentas.component";
import { DataCuentasComponent } from "@web/http/pages/cuentas/data/data-cuentas.component";

@NgModule({
  declarations: [IndexClientComponent, IndexCuentasComponent],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PagesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    UIModule,
    WidgetModule,
    FullCalendarModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    SimplebarAngularModule,
    LightboxModule,
    PickerModule,
    HighchartsChartModule,
    Select2Module,
    MatFormFieldModule,
    MatSelectModule,
    //Cliente
    DataClientComponent,
    DataCuentasComponent,
  ],
  providers: [ClienteService, CuentaService],
})
export class PagesModule {}

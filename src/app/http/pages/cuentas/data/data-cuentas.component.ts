import {
  Component,
  ViewChild,
  inject,
  signal,
  TemplateRef,
  Input,
} from "@angular/core";

import { AgGridAngular, AgGridModule } from "ag-grid-angular";
import { ColDef, ValueGetterParams } from "ag-grid-community";
import { ButtonsClienteAgGrid } from "@web/shared/ui/aggrid/cliente/buttons-cliente.component";
import { ToastrService } from "ngx-toastr";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Cliente } from "@web/core/models/cliente.model";
import { CuentaService } from "@web/core/services/app/cuenta.service";
import { FormCuentasComponent } from "../form/form-cuentas.component";
import { ActivatedRoute } from "@angular/router";
import { Cuenta } from "@web/core/models/cuenta.model";
import { ButtonsAgGrid } from "@web/shared/ui/aggrid/buttons.component";
import { FormatDateAgGrid } from "@web/shared/ui/aggrid/format-date.component";

@Component({
  selector: "app-data-cuentas",
  templateUrl: "./data-cuentas.component.html",
  standalone: true,
  imports: [AgGridModule, FormCuentasComponent],
})
export class DataCuentasComponent {
  private service = inject(CuentaService);
  private toastr = inject(ToastrService);
  private modalService = inject(BsModalService);
  private route = inject(ActivatedRoute);

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild("ModalCreate") ModalCreate: TemplateRef<any>;
  @ViewChild("ModalEdit") ModalEdit: TemplateRef<any>;

  breadCrumbItems: Array<{}>;
  RowData = signal<Cuenta[]>([]);
  Cliente = signal<Cliente>(null);
  themeClass = "ag-theme-quartz";
  context: any;

  /**
   * Open modal
   * @param content modal content
   */
  modalRef?: BsModalRef;
  config: any = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modal-dialog-centered modal-lg",
  };

  DataEdit: Cliente | null;

  constructor() {
    this.context = {
      componentParent: this,
    };
  }

  async ngOnInit(): Promise<void> {
    await this.getAll();

    this.breadCrumbItems = [
      { label: "Inicio" },
      { label: "Clientes", active: true },
    ];
  }

  colDefs: ColDef<Cuenta>[] = [
    { field: "cuenta_id", headerName: "Cuenta ID", width: 100 },
    { field: "det_producto", headerName: "Producto", width: 200 },
    {
      field: "fecha_apertura",
      headerName: "Fecha Apertura",
      width: 150,
      valueGetter: (params: ValueGetterParams) => params.data.fecha_apertura,
      cellRenderer: FormatDateAgGrid,
    },
    {
      field: "fecha_cierre",
      headerName: "Fecha Cierre",
      width: 150,
      valueGetter: (params: ValueGetterParams) => params.data.fecha_cierre,
      cellRenderer: FormatDateAgGrid,
    },
    {
      field: "fecha_ultima_transaccion",
      headerName: "Fecha Última Transacción",
      valueGetter: (params: ValueGetterParams) =>
        params.data.fecha_ultima_transaccion,
      cellRenderer: FormatDateAgGrid,
      width: 120,
    },
    { field: "moneda", headerName: "Moneda", width: 120 },
    { field: "numero_cuenta", headerName: "Número Cuenta", width: 150 },
    { field: "producto_id", headerName: "Producto ID", width: 120 },
    { field: "saldo_actual", headerName: "Saldo Actual", width: 120 },
    { field: "saldo_disponible", headerName: "Saldo Disponible", width: 120 },
    { field: "tasa_interes", headerName: "Tasa Interés", width: 120 },
    { field: "tipo_cuenta", headerName: "Tipo Cuenta", width: 120 },
    { field: "usuario_creacion", headerName: "Usuario Creación", width: 120 },
    {
      headerName: "Acciones",
      editable: false,
      valueGetter: (params: ValueGetterParams) => params.data,
      cellRenderer: ButtonsAgGrid,
      pinned: "right",
      flex: 1,
      width: 100,
    },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    width: 300,
    autoHeight: true,
  };

  refresh() {
    this.getAll(true);
  }

  async getAll(refresh?: boolean): Promise<void> {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      const res = await this.service.getByIdAsync(Number(id));

      if (res && res.cuentas) {
        console.log("Cuentas del cliente:", res.cuentas);
        this.Cliente.set(res.cliente);
        this.RowData.set(res.cuentas);
      }
    }

    if (refresh) {
      this.toastr.success(`Informacion actualizada desde la fuente de datos`);
    }
  }

  edit(role: Cliente) {
    this.showModal(this.ModalEdit, role);
  }

  showModal(template: TemplateRef<any>, cliente?: Cliente, config?: any) {
    this.DataEdit = cliente;
    config = config ?? this.config;
    this.modalRef = this.modalService.show(template, config);
  }

  showModalCreate() {
    const config: any = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-dialog-centered modal-fullscreen",
    };

    this.modalRef = this.modalService.show(this.ModalCreate, config);
  }

  confirmSave(event: string) {
    this.toastr.success(event);
    this.refresh();
    this.modalRef?.hide();
  }

  closeModal(info: string) {
    this.modalRef?.hide();
  }

  clearFilter() {
    const data = this.agGrid.api.setFilterModel(null);
  }

  confirmLoad(event: string) {
    this.toastr.success(event);
    this.refresh();
    this.modalRef?.hide();
  }
}

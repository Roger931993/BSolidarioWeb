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
import { ClienteService } from "@web/core/services/app/cliente.service";
import { FormClienteComponent } from "../form/form-cliente.component";
import { ButtonsAgGrid } from "@web/shared/ui/aggrid/buttons.component";

@Component({
  selector: "app-data-client",
  templateUrl: "./data-client.component.html",
  standalone: true,
  imports: [AgGridModule, FormClienteComponent],
})
export class DataClientComponent {
  private service = inject(ClienteService);
  private toastr = inject(ToastrService);
  private modalService = inject(BsModalService);

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild("ModalCreate") ModalCreate: TemplateRef<any>;
  @ViewChild("ModalEdit") ModalEdit: TemplateRef<any>;
  @ViewChild("ModalIndicadores") ModalIndicadores: TemplateRef<any>;
  @ViewChild("ModalDiagnose") ModalDiagnose: TemplateRef<any>;

  breadCrumbItems: Array<{}>;
  RowData = signal<Cliente[]>([]);
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

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Inicio" },
      { label: "Clientes", active: true },
    ];

    this.getAll();
  }

  colDefs: ColDef<Cliente>[] = [
    { field: "primer_nombre", headerName: "Primer Nombre", width: 200 },
    { field: "segundo_nombre", headerName: "Segundo Nombre", width: 200 },
    { field: "apellido_paterno", headerName: "Apellido Paterno", width: 150 },
    { field: "apellido_materno", headerName: "Apellido Materno", width: 150 },
    { field: "identificacion", headerName: "Identificación", width: 120 },
    { field: "username", headerName: "User Name", width: 120 },
    {
      headerName: "Acciones",
      editable: false,
      valueGetter: (params: ValueGetterParams) => params.data,
      cellRenderer: ButtonsClienteAgGrid,
      pinned: "right",
      flex: 1,
      width: 130,
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
    let res = [];
    res = await this.service.getAsync();
    this.RowData.set(res);

    if (refresh) {
      this.toastr.success(`Informacion actualizada desde la fuente de datos`);
    }
  }

  delete(event: Cliente) {
    this.service.delete(event.cliente_id).subscribe({
      next: () => {
        this.deleteItem(event);
        this.toastr.success(`Registro eliminado exitosamente!!!!`);
      },
      error: (err) => {
        this.toastr.error(
          `por favor, inténtelo de nuevo más tarde. ${err}`,
          "Algo malo sucedió!!!!"
        );
      },
    });
  }

  deleteItem(cliente: Cliente) {
    this.RowData.update((items) =>
      items.filter((item) => {
        return item.cliente_id !== cliente.cliente_id;
      })
    );
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

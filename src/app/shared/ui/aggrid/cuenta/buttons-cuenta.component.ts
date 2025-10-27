import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import {
  Component,
  EventEmitter,
  inject,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import Swal from "sweetalert2";
import { Router, RouterLink } from "@angular/router";
import { NgbOffcanvas } from "@ng-bootstrap/ng-bootstrap";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormCuentasComponent } from "@web/http/pages/cuentas/form/form-cuentas.component";

@Component({
  standalone: true,
  imports: [FormCuentasComponent],
  templateUrl: "./buttons-cuenta.component.html",
})
export class ButtonsCuentaAgGrid implements ICellRendererAngularComp {
  public data!: any;
  componentParent: any;
  params: any;

  @ViewChild("ModalCreate") ModalCreate: TemplateRef<any>;

  constructor(private router: Router) {}

  private offcanvasService = inject(NgbOffcanvas);
  private modalService = inject(BsModalService);
  modalRef?: BsModalRef;

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.data = this.getValueToDisplay(this.params);
    this.componentParent = this.params.context.componentParent;

    console.log("params button cuenta", this.data);
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params: ICellRendererParams) {
    // set value into cell again
    this.data = this.getValueToDisplay(params);
    return true;
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  view() {
    //console.log('view', this.data);
    // alert(`${this.data} edot won!`);
  }

  edit() {
    this.componentParent.edit(this.data);
  }

  delete() {
    this.confirm();
  }

  confirm() {
    Swal.fire({
      title:
        '<div class="mb-2 d-none"><i class="dripicons-warning text-warning h3"></i></div>  <div class="text-warning">¿Estás seguro?</div>  ',
      text: "¡No podrás revertir esto!",
      showCancelButton: true,
      confirmButtonColor: "#6CA342",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.componentParent.delete(this.data);
      }
    });
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: "end" });
  }

  showModal(template: TemplateRef<any>, config) {
    this.modalRef = this.modalService.show(template, config);
  }

  confirmSave(event: string) {
    // this.toastr.success(event);
    this.modalRef?.hide();
    this.componentParent.refresh();
  }
}

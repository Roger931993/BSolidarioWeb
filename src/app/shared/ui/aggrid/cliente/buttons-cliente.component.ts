import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { Component, EventEmitter, Output } from "@angular/core";
import Swal from "sweetalert2";
import { Router, RouterLink } from "@angular/router";

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./buttons-cliente.component.html",
})
export class ButtonsClienteAgGrid implements ICellRendererAngularComp {
  public data!: any;
  componentParent: any;
  params: any;

  constructor(private router: Router) {}

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.data = this.getValueToDisplay(this.params);
    this.componentParent = this.params.context.componentParent;
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

  diagnose() {
    this.componentParent.diagnose(this.data);
  }
}

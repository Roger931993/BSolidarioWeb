import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Component } from '@angular/core';
import { StatusGeneralAll } from '@web/core/data/Status';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aggrid-status',
  standalone: true,
  templateUrl: './status.component.html',
  imports: [CommonModule],
})
export class StatusAgGrid implements ICellRendererAngularComp {
  public data!: any;
  componentParent: any;
  params: any;
  status: number | null;
  // StatusData = RegisterStatusData;
  StatusObj: any;

  constructor() {}

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.data = this.getValueToDisplay(this.params);
    this.componentParent = this.params.context.componentParent;

    this.status = parseInt(this.data);

    if (typeof this.data !== 'number' && typeof this.data !== 'boolean') {
      this.status = parseInt(this.data.status);
    }

    if (typeof this.data == 'boolean') {
      this.status = this.data ? 1 : 0;
    }

    this.StatusObj = StatusGeneralAll.find((item) => {
      return item.id == this.status;
    });
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  refresh(params: ICellRendererParams) {
    // set value into cell again
    this.data = this.getValueToDisplay(params);
    return true;
  }
}

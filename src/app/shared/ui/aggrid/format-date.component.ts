import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  template: `<div>
    @if(date){
    <i class="bx bx-calendar-event me-1" tooltip="d/M/Y" placement="left"></i>
    <span>{{ date }}</span>
    }
  </div>`,
})
export class FormatDateAgGrid implements ICellRendererAngularComp {
  public data!: any;
  componentParent: any;
  params: any;
  date: string | null = null;

  constructor() {}

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.data = this.getValueToDisplay(this.params);
    this.componentParent = this.params.context.componentParent;

    this.date = this.data ? new Date(this.data).toLocaleDateString() : '';
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

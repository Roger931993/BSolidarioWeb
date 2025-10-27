import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  template: `<div
    class="text-large-aggrid font-size-11 text-wrap text-justify py-2"
  >
    {{ data }}
  </div> `,
  imports: [CommonModule],
})
export class TextLargeAgGrid implements ICellRendererAngularComp {
  public data!: any;
  componentParent: any;
  params: any;
  // status: number | null;
  // StatusData = StatusData;
  // StatusObj: any;

  constructor() {}

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.data = this.getValueToDisplay(this.params);
    this.componentParent = this.params.context.componentParent;
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

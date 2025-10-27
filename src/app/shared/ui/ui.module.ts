import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
// import { UiProjectButtonComponent } from './aggrid/project/partial/ui-project-button/ui-project-button.component';
@NgModule({
  declarations: [PagetitleComponent, LoaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule,
  ],
  exports: [PagetitleComponent, LoaderComponent],
})
export class UIModule {}

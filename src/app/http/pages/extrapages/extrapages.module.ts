import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgOtpInputModule } from 'ng-otp-input';

import { ExtrapagesRoutingModule } from './extrapages-routing.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [MaintenanceComponent, Page404Component, Page500Component],
  imports: [
    CommonModule,
    ExtrapagesRoutingModule,
    NgOtpInputModule,
    SlickCarouselModule,
  ],
})
export class ExtrapagesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ShiftreportRoutingModule } from './shiftreport-routing.module';
import { IndexComponent } from './index/index.component';
import { RatedCapacityComponent } from './component/rated-capacity/rated-capacity.component';

@NgModule({
  declarations: [IndexComponent, RatedCapacityComponent],
  imports: [
    CommonModule,
    ShiftreportRoutingModule,
    SharedModule,
  ]
})
export class ShiftreportModule { }

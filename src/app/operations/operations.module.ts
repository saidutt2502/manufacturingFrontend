import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialExportModule } from '../material-export';
import { SharedModule } from '../shared/shared.module';
import { OperationsRoutingModule } from './operations-routing.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    MaterialExportModule,
    SharedModule,
    OperationsRoutingModule
  ]
})
export class OperationsModule { }

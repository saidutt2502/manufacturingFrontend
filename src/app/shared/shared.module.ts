import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialExportModule } from '../material-export';
import { DatatableComponent } from './component/datatable/datatable.component';

@NgModule({
  declarations: [DatatableComponent],
  imports: [
    CommonModule,
    MaterialExportModule
  ],
  exports : [
    DatatableComponent
  ],
})
export class SharedModule { }

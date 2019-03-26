import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialExportModule } from '../material-export';
import { DatatableComponent, DialogOverviewExampleDialog } from './component/datatable/datatable.component';

@NgModule({
  declarations: [DatatableComponent,DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    MaterialExportModule
  ],
  exports : [
    DatatableComponent
  ],
  entryComponents: [DialogOverviewExampleDialog]
})
export class SharedModule { }

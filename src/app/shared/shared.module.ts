import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialExportModule } from '../material-export';
import { DatatableComponent, DialogOverviewExampleDialog } from './component/datatable/datatable.component';
import { ModifyTablePipe } from './pipes/modify-table.pipe';

@NgModule({
  declarations: [DatatableComponent,DialogOverviewExampleDialog, ModifyTablePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExportModule
  ],
  exports : [
    DatatableComponent
  ],
  entryComponents: [DialogOverviewExampleDialog]
})
export class SharedModule { }

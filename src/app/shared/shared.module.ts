import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialExportModule } from '../material-export';
import { DatatableComponent, DialogOverviewExampleDialog } from './component/datatable/datatable.component';
import { ModifyTablePipe } from './pipes/modify-table.pipe';
import { CheckEqualityPipe } from './pipes/check-equality.pipe';
import { TypeaheadComponent } from './component/typeahead/typeahead.component';

@NgModule({
  declarations: [DatatableComponent,DialogOverviewExampleDialog,ModifyTablePipe, CheckEqualityPipe, TypeaheadComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExportModule,
  ],
  exports : [
    MaterialExportModule,
    DatatableComponent,
    TypeaheadComponent,
    CheckEqualityPipe
  ],
  entryComponents: [DialogOverviewExampleDialog]
})
export class SharedModule { }

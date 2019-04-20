import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExportModule } from '../material-export';
import { DatatableComponent, EditModal, DeleteModal } from './component/datatable/datatable.component';
import { ModifyTablePipe } from './pipes/modify-table.pipe';
import { CheckEqualityPipe } from './pipes/check-equality.pipe';
import { TypeaheadComponent } from './component/typeahead/typeahead.component';

@NgModule({
  declarations: [DatatableComponent, EditModal, ModifyTablePipe, CheckEqualityPipe, TypeaheadComponent, DeleteModal],
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
  entryComponents: [EditModal,DeleteModal]
})
export class SharedModule { }

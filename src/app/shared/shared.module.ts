import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExportModule } from '../material-export';
import { DatatableComponent, EditModal, DeleteModal } from './component/datatable/datatable.component';
import { ModifyTablePipe } from './pipes/modify-table.pipe';
import { CheckEqualityPipe } from './pipes/check-equality.pipe';
import { TypeaheadComponent } from './component/typeahead/typeahead.component';
import { TrackerComponent } from './component/tracker/tracker.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [DatatableComponent, EditModal, ModifyTablePipe, CheckEqualityPipe, TypeaheadComponent, DeleteModal, TrackerComponent],
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
    TrackerComponent,
    CheckEqualityPipe
  ],
  entryComponents: [EditModal,DeleteModal],
  providers:[DatePipe]
})
export class SharedModule { }

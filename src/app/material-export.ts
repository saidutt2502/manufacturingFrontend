import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,MatIconModule,
  MatToolbarModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatBottomSheetModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSnackBarModule
     } from '@angular/material';

const modules = [
  FormsModule,
  ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSnackBarModule
    
];


@NgModule({
  imports: [modules],
  exports: [modules],
})
export class MaterialExportModule { }
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

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
  MatSnackBarModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatRadioModule,
  MatGridListModule,
  MatStepperModule
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
    MatSnackBarModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatGridListModule,
    NgSelectModule,
    MatStepperModule
    
];


@NgModule({
  imports: [modules],
  exports: [modules],
})
export class MaterialExportModule { }
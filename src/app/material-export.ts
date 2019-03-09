import { NgModule } from '@angular/core';
import {  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,MatIconModule,  } from '@angular/material';

const modules = [
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatIconModule
];


@NgModule({
  imports: [modules],
  exports: [modules],
})
export class MaterialExportModule { }
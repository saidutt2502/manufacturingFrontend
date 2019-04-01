import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialExportModule } from '../material-export';
import { DepartmentsComponent } from './component/departments/departments.component';
import { ProductsComponent } from './component/products/products.component';
import { LinesComponent } from './component/lines/lines.component';

@NgModule({
  declarations: [IndexComponent, DepartmentsComponent, ProductsComponent, LinesComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    MaterialExportModule

  ]
})
export class SettingsModule { }

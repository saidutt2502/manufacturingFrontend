import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DepartmentsComponent } from './component/departments/departments.component';
import { ProductsComponent } from './component/products/products.component';
import { LinesComponent } from './component/lines/lines.component';
import { PermissionsComponent } from './component/permissions/permissions.component';

@NgModule({
  declarations: [IndexComponent, DepartmentsComponent, ProductsComponent, LinesComponent, PermissionsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
  ]
})
export class SettingsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DepartmentsComponent } from './component/departments/departments.component';
import { LinesComponent } from './component/lines/lines.component';
import { PermissionsComponent } from './component/permissions/permissions.component';
import { SubAssembliesComponent } from './component/sub-assemblies/sub-assemblies.component';
import { CustomersComponent,DialogOverviewExampleDialog } from './component/customers/customers.component';

@NgModule({
  declarations: [IndexComponent, DepartmentsComponent, LinesComponent, PermissionsComponent, SubAssembliesComponent, CustomersComponent,DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
  ],
  entryComponents: [DialogOverviewExampleDialog]
})
export class SettingsModule { }

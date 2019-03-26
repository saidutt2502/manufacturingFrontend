import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialExportModule } from '../material-export';
import { IndexComponent } from './index/index.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LocationsComponent } from './components/locations/locations.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [IndexComponent, LocationsComponent, DepartmentsComponent, UsersComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    MaterialExportModule
  ],  
  bootstrap: [IndexComponent],
})
export class SettingsModule { }

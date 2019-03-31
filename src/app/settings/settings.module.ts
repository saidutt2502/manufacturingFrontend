import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialExportModule } from '../material-export';
import { IndexComponent } from './index/index.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LocationsComponent } from './components/locations/locations.component';
import { UsersComponent } from './components/users/users.component';
import { UsystemsComponent } from './components/usystems/usystems.component';
import { UserlocationComponent } from './components/userlocation/userlocation.component';
import { HodlocationComponent } from './components/hodlocation/hodlocation.component';

@NgModule({
  declarations: [IndexComponent, LocationsComponent, UsersComponent, UsystemsComponent, UserlocationComponent, HodlocationComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    MaterialExportModule
  ]
})
export class SettingsModule { }

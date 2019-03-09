import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialExportModule } from '../material-export';

import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialExportModule
  ],
  declarations: [
    LoginComponent,
  ]
})
export class AuthModule { }

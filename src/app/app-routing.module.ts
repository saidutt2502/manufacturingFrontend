import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',canActivate: [AuthGuard] },
  { path: 'stationary', loadChildren: './stationary/stationary.module#StationaryModule',canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsModule',canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

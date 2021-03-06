import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsModule', canActivate: [AuthGuard] },
  { path: 'customerservice', loadChildren: './customerservice/customerservice.module#CustomerserviceModule', canActivate: [AuthGuard] },
  { path: 'planning', loadChildren: './planning/planning.module#PlanningModule', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

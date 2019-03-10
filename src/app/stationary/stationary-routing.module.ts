import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './component/index/index.component'
import { StockMasterComponent } from './component/stock-master/stock-master.component'

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'stock-master', component: StockMasterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationaryRoutingModule { }

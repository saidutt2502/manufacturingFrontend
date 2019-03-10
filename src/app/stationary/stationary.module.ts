import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { MaterialExportModule } from '../material-export';
import { StationaryRoutingModule } from './stationary-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StockMasterComponent , DialogOverviewExampleDialog } from './component/stock-master/stock-master.component';
import { IndexComponent } from './component/index/index.component';

@NgModule({
  declarations: [StockMasterComponent, IndexComponent, DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    FormsModule,
    MaterialExportModule,
    SharedModule,
    StationaryRoutingModule,
  ],
  entryComponents: [DialogOverviewExampleDialog]
})
export class StationaryModule { }

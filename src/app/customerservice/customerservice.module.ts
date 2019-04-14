import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { CustomerserviceRoutingModule } from './customerservice-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrderEntryComponent,OrderModal } from './component/order-entry/order-entry.component';

@NgModule({
  declarations: [IndexComponent, OrderEntryComponent, OrderModal],
  imports: [
    CommonModule,
    CustomerserviceRoutingModule,
    SharedModule
  ],
  entryComponents: [OrderModal]
})
export class CustomerserviceModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { CustomerserviceRoutingModule } from './customerservice-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrderEntryComponent,OrderModal } from './component/order-entry/order-entry.component';
import { OrderViewComponent,OrderviewModal,CancelModal } from './component/order-view/order-view.component';

@NgModule({
  declarations: [IndexComponent, OrderEntryComponent, OrderModal, OrderViewComponent, OrderviewModal, CancelModal],
  imports: [
    CommonModule,
    CustomerserviceRoutingModule,
    SharedModule
  ],
  entryComponents: [OrderModal,OrderviewModal,CancelModal]
})
export class CustomerserviceModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { CustomerserviceRoutingModule } from './customerservice-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrderEntryComponent,OrderModal } from './component/order-entry/order-entry.component';
import { OrderViewComponent,OrderviewModal,CancelModal } from './component/order-view/order-view.component';
import { CustomerInformationComponent,DeleteModalCustomer, EditModalCustomer, CustomerInformationModal } from './component/customer-information/customer-information.component';

@NgModule({
  declarations: [IndexComponent, OrderEntryComponent, OrderModal, OrderViewComponent, OrderviewModal, CancelModal, CustomerInformationComponent,DeleteModalCustomer,EditModalCustomer,CustomerInformationModal],
  imports: [
    CommonModule,
    CustomerserviceRoutingModule,
    SharedModule
  ],
  entryComponents: [OrderModal,OrderviewModal,CancelModal,DeleteModalCustomer,EditModalCustomer,CustomerInformationModal]
})
export class CustomerserviceModule { }

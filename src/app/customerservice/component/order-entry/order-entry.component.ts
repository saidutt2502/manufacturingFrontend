import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import {formatDate} from '@angular/common';
import { UpdatetableService } from '../../../shared/service/updatetable.service';
import { CustomerserviceService } from '../../../customerservice/services/customerservice.service';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators  } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from '@angular/material';

import { AuthenticationService } from '../../../auth/services/authentication.service';

@Component({
  selector: 'order-entry',
  templateUrl: './order-entry.component.html',
  styleUrls: ['./order-entry.component.css']
})
export class OrderEntryComponent implements OnInit {

  constructor(private tableApi: UpdatetableService,private currenttableApi: CustomerserviceService, private fb: FormBuilder, public dialog: MatDialog) {}

  curDate = formatDate(new Date(), 'd MMM y', 'en');
  allDepts: any;
  allCustomers: any;
  allPos: any;
  po_count: any;
  orderForm: FormGroup;
  selected_variable:any;
  po_check: Boolean = false;


  ngOnInit() {
    this.tableApi.readTableRow({tablename: 'departments'}).subscribe((data: {}) => {
      this.allDepts = data['success'];
    });

    this.orderForm = this.fb.group({
      department: [[
        Validators.required
      ]],
      customer: [[
        Validators.required
      ]],
      selected_option: ['', [
        Validators.required
      ]],
      po_number: ['', [
        Validators.required
      ]],
    });

    

  }

  departmentChange()
  {
    this.po_check = false;  
    this.orderForm.patchValue({ customer: "" , po_number: ""});
    this.allPos = "";

    let createThis = {
      createData: this.orderForm.value,
      tablename: 'customers'
     };

     this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
      this.allCustomers = data['success'];
    });
  }

  
  assignSelected(){
    this.po_check = false;  
    this.orderForm.patchValue({ po_number: "" });
    this.selected_variable = this.orderForm.value['selected_option'];
  }


  customerChange(){

    this.orderForm.patchValue({ po_number: "" });
    this.po_check = false;  

    let createThis = {
      createData: this.orderForm.value,
      tablename: 'customers_po'
     };

    this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
      this.allPos = data['success'];
    });
  }

  orderClick(){
    this.po_check = false;  

  if(this.orderForm.value['selected_option']=='1')
  {
    let createThis = {
      createData: this.orderForm.value,
      tablename: 'po_exists'
     };

    this.currenttableApi.existsTableValue(createThis).subscribe((data: {}) => {
    this.po_count = data['success'];
    if(this.po_count==0)
    {
      const dialogRef = this.dialog.open(OrderModal, {
        width: '70%',
        data: {order_entry_data:this.orderForm.value}
      });
    }
    else
    {
      this.po_check = true;
    } 
    });
    
  }
  else
  {
    console.log('here');
    const dialogRef = this.dialog.open(OrderModal, {
          width: '70%',
          data: {order_entry_data:this.orderForm.value}
        });
  }  
  }

}


// Order Modal Component

@Component({
  selector: 'order-modal',
  templateUrl: 'order-modal.html',
  styleUrls: ['./order-entry.component.css']
})
export class OrderModal implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<OrderModal>,
    @Inject(MAT_DIALOG_DATA) public data: any, public tableApi: UpdatetableService, private fb: FormBuilder, private updateTable: CustomerserviceService, private snackBar: MatSnackBar, private authenticationService: AuthenticationService) {dialogRef.disableClose = true;}

  allProducts: any;
  allProducts_new: any;
  allInfo: any;
  allPoinfo: any;
  drawing_number: any ="";
  selected_variable:any;
  entryForm_new: FormGroup;
  entryForm: FormGroup; 
  public userName:any;  

  ngOnInit() {

    this.selected_variable = this.data['order_entry_data']['selected_option'];

    // NEW ORDER

    this.entryForm_new = this.fb.group({
      item_code: ['', [
        Validators.required
      ]],
      location_orders: this.fb.array([])
    });

    let createThis = {
      createData: this.data['order_entry_data'],
      tablename: 'customer_products'
     };

     this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
     this.allProducts_new = data['success'];
    });

    // EDIT ORDER

    this.entryForm = this.fb.group({
      item_code: ['', [
        Validators.required
      ]],
      location_orders: this.fb.array([])
    });

    
    //Setting Username Here
    this.userName = this.authenticationService.currentUserValue;
    this.userName = `${this.userName.id}`;

  }

  // NEW ORDER

  changeProduct_new(){

    let createThis = {
      createData: this.entryForm_new.value,
      tablename: 'product_info'
    }

    this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
      this.drawing_number = data['success']['drawing_number'];
      console.log(data);
     });


    while (this.location_orderForms_new.length !== 0) {
      this.location_orderForms_new.removeAt(0)
    }
  }

  get location_orderForms_new() {
    return this.entryForm_new.get('location_orders') as FormArray;
  }

  addOrder_new() {
    const location_order = this.fb.group({
      location: ['', [
        Validators.required
      ]],
      openorder: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]],
      requiredquantity: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]],
      priority: ['', [
        Validators.required
      ]]
    })
  
    this.location_orderForms_new.push(location_order);
  }
  
  deleteOrder_new(i) {
    this.location_orderForms_new.removeAt(i);
  }

  submitForm_new(){
    let createThis = {
      createData: this.entryForm_new.value,
      customer_id: this.data['order_entry_data']['customer'],
      po_number: this.data['order_entry_data']['po_number'],
      user_id: this.userName,
      tablename: 'order_entry'
     };

    this.updateTable.createTableInsert(createThis).subscribe((data: {}) => {
    this.entryForm_new.reset();
    this.drawing_number="";      
    this.openSnackBar("Order Punched Successfully","Close");
    });
  }



  // EDIT ORDER
  get location_orderForms() {
    return this.entryForm.get('location_orders') as FormArray;
  }

  addOrder() {
    const location_order = this.fb.group({
      location: ['', [
        Validators.required
      ]],
      openorder: ['', [
        Validators.required
      ]],
      requiredquantity: ['', [
        Validators.required
      ]],
      priority: ['', [
        Validators.required
      ]]
    })
  
    this.location_orderForms.push(location_order);
  }
  
  deleteOrder(i) {
    this.location_orderForms.removeAt(i);
  }


  submitForm(){
    let createThis = {
      createData: this.entryForm.value,
      customer_id: this.data['order_entry_data']['customer'],
      po_number: this.data['order_entry_data']['po_number'],
      user_id: this.userName,
      tablename: 'orders'
     };

    this.updateTable.createTableInsert(createThis).subscribe((data: {}) => {
    this.openSnackBar("Order Punched Successfully","Close");
    });
  }

  changeProduct(){

    
    let createThis1 = {
      createData: this.entryForm.value,
      tablename: 'product_info'
    }

    this.tableApi.readTableRow(createThis1).subscribe((data: {}) => {
      this.drawing_number = data['success']['drawing_number'];
      console.log(data);
     });


    while (this.location_orderForms.length !== 0) {
      this.location_orderForms.removeAt(0)
    }

    let createThis = {
      createData: this.data['order_entry_data'] ,
      tablename: 'po_info',
      product_id:this.entryForm.value['item_code']
     };


    this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
      this.allPoinfo = data['success'];
      for(var each_info of this.allPoinfo)
      {
          const order_variable = this.fb.group({
            location: [each_info['delivery_location'], [
              Validators.required
            ]],
            openorder: [each_info['open_orders'], [
              Validators.required
            ]],
            requiredquantity: [each_info['required_quantity'], [
              Validators.required
            ]],
            priority: [each_info['priority'], [
              Validators.required
            ]],
          })
        
          this.location_orderForms.push(order_variable);
        }
    });
  }

  //Notification bar 
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}


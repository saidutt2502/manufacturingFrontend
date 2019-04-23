import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { UpdatetableService } from '../../../shared/service/updatetable.service';
import { CustomerserviceService } from '../../../customerservice/services/customerservice.service';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators  } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css']
})
export class CustomerInformationComponent implements OnInit {

constructor(private tableApi: UpdatetableService,private currenttableApi: CustomerserviceService, private fb: FormBuilder, public dialog: MatDialog, private updateTable: CustomerserviceService, private snackBar: MatSnackBar) {}

  allDepts: any;
  customerForm: FormGroup;
  apiData: any;

  displayedColumns: string[] = ['customer','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit() {
    this.tableApi.readTableRow({tablename: 'departments'}).subscribe((data: {}) => {
      this.allDepts = data['success'];
    });

    this.customerForm = this.fb.group({
      department: [,[
        Validators.required
      ]],
      customer: [,[
        Validators.required
      ]],
    });
  }

  resetForm(){
    this.customerForm.reset();
    this.dataSource=null;
  }

  departmentChange()
  {
    this.customerForm.controls['customer'].reset();

    let createThis = {
      createData: this.customerForm.value,
      tablename: 'customers'
     };
  
    this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
      this.apiData = data['success'] ;
      this.dataSource = new MatTableDataSource(this.apiData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  submitForm(){

    let createThis = {
      customer_name: this.customerForm.value['customer'],
      dept_id: this.customerForm.value['department'],
      tablename: 'customers'
     };

     this.updateTable.createTableInsert(createThis).subscribe((data: {}) => {
        this.apiData.push(data['success']);
        this.dataSource = new MatTableDataSource(this.apiData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.openSnackBar("Customer Inserted Successfully","Close");
        this.customerForm.controls['customer'].reset();
    });
  }

   //Notification bar 
   openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  onClickDelete(row: any){
    const dialogRef = this.dialog.open(DeleteModalCustomer, {
      width: '70%',
      data: {delete_entry_data:row,id:row.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result=='Deleted')
      {
      let index: number = this.apiData.findIndex(d => d === row);
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.openSnackBar("Customer Deleted Successfully","Close");
      } 
    });
  }

  onClickEdit(row: any) {
    const dialogRef = this.dialog.open(EditModalCustomer, {
      width: '70%',
      data: { edit_entry_data: row, id: row.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        let index: number = this.apiData.findIndex(d => d === row);
        for (var eachUpdatedColumn in result) {
          this.dataSource.data[index][eachUpdatedColumn] = result[eachUpdatedColumn];
        }
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.openSnackBar("Customer Updated Successfully","Close");     
      }
    });
  }

  onClickAdd(row: any) {
    const dialogRef = this.dialog.open(CustomerInformationModal, {
      width: '70%',
      data: { info_entry_data: row, id: row.id, department:this.customerForm.value['department'] }
    });
  }
}

@Component({
  selector: 'delete-modal',
  templateUrl: 'delete-modal.html',
})
export class DeleteModalCustomer implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteModalCustomer>,
    @Inject(MAT_DIALOG_DATA) public data: any, private currenttableApi: CustomerserviceService) {dialogRef.disableClose = true;}

  name=this.data['delete_entry_data']['customer'];
 
 
  ngOnInit() {}

  confirmDelete(){
    let createThis = {
      id: this.data['id'],
      tablename: 'customers'
     };

    this.currenttableApi.deleteTableValue(createThis).subscribe((data: {}) => {
    });
  }
}


@Component({
  selector: 'edit-modal',
  templateUrl: 'edit-modal.html',
})
export class EditModalCustomer implements OnInit {

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditModalCustomer>,
    @Inject(MAT_DIALOG_DATA) public data: any, private currenttableApi: CustomerserviceService) {dialogRef.disableClose = true;}

  name=this.data['edit_entry_data']['customer'];
 
 
  ngOnInit() {
    const formData = {};
    formData['customer'] = new FormControl(this.data['edit_entry_data']['customer'],[Validators.required]);
    this.form = new FormGroup(formData);
  }

  confirmEdit(){
    let createThis = {
      id: this.data['id'],
      customer_name: this.form.value['customer'],
      tablename: 'customers'
     };

    this.currenttableApi.editTableValue(createThis).subscribe((data: {}) => {
    });
  }
}

@Component({
  selector: 'information-modal',
  templateUrl: 'information-modal.html',
})
export class CustomerInformationModal implements OnInit {

  public detailsForm: FormGroup;
  selected_variable:any;
  allProducts:any;
  allProducts_get:any;
  allLocations:any;
  product_check:Boolean = false;
  location_check:Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CustomerInformationModal>,
    @Inject(MAT_DIALOG_DATA) public data: any, private currenttableApi: CustomerserviceService, private fb: FormBuilder, private tableApi: UpdatetableService, private snackBar: MatSnackBar) {dialogRef.disableClose = true;}

  name=this.data['info_entry_data']['customer'];
 
 
  ngOnInit() {

    let createThis = {
      department: this.data['department'],
      tablename: 'products'
     };

    this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
      this.allProducts = data['success'];
    
     });

    this.detailsForm = this.fb.group({
      selected_option: [, [
        Validators.required
      ]],
      products: this.fb.array([]),
      locations: this.fb.array([])
    });
  }


  optionSelected(){
    this.selected_variable = this.detailsForm.value['selected_option'];

    if(this.selected_variable==1)
    {
      this.product_check=false;

      while (this.productForms.length !== 0) {
        this.productForms.removeAt(0)
      }

      let createThis = {
        customer_id: this.data['id'],
        tablename: 'customer_products'
       };
  
      this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
        this.allProducts_get = data['success'];
        for(var each_line of this.allProducts_get)
        {
            const product_variable = this.fb.group({
              product_name: [each_line['item_code'], [
                Validators.required
              ]],
            })

            this.productForms.push(product_variable);
          }
         
      });
    }
    else if(this.selected_variable==2)
    {
      this.location_check=false;

    

      while (this.locationForms.length !== 0) {
        this.locationForms.removeAt(0)
      }
  
      
  
      let createThis1 = {
        customer_id: this.data['id'],
        tablename: 'customer_delivery_locations'
       };
  
      this.tableApi.readTableRow(createThis1).subscribe((data: {}) => {
        this.allLocations = data['success'];
        for(var each_location of this.allLocations)
        {
            const location_variable = this.fb.group({
              location_name: [each_location['delivery_location'], [
                Validators.required
              ]]
            })
          
            this.locationForms.push(location_variable);
          }
      });
    }

  }

  //Products

  get productForms() {
    return this.detailsForm.get('products') as FormArray;
  }

  addProduct() {
    const product = this.fb.group({
      product_name: [, [
        Validators.required
      ]]
    })
  
    this.productForms.push(product);
  }
  
  deleteProduct(i) {
    this.productForms.removeAt(i);
  }

  submitForm_product(){
    let createThis = {
      createData: this.detailsForm.value,
      customer_id: this.data['id'],
      tablename: 'products'
     };

    this.currenttableApi.createTableInsert(createThis).subscribe((data: {}) => {
      // if(data['success']=='undefined')
      // {
      //   this.product_check=true;
      // }
      // else if(data['success']=='last_entry_delete')
      // {
      //   this.detailsForm.reset();
      //   this.openSnackBar("Products Dismissed Successfully","Close");
      // }
      // else
      // {
        this.detailsForm.reset();
        while (this.productForms.length !== 0) {
        this.productForms.removeAt(0)
        }
        this.openSnackBar("Products Assigned Successfully","Close");
      // }
    });
  }

  //Delivery Locations

  get locationForms() {
    return this.detailsForm.get('locations') as FormArray;
  }

  addLocation() {
    this.location_check=false;
    const location = this.fb.group({
      location_name: ['', [
        Validators.required
      ]]
    })
  
    this.locationForms.push(location);
  }
  
  deleteLocation(i) {
    this.locationForms.removeAt(i);
  }

  submitForm_location(){
    let createThis = {
      createData: this.detailsForm.value,
      customer_id: this.data['id'],
      tablename: 'delivery_locations'
     };

    this.currenttableApi.createTableInsert(createThis).subscribe((data: {}) => {
      if(data['success']=='undefined')
      {
        this.location_check=true;
      }
      else if(data['success']=='last_entry_delete')
      {
        this.detailsForm.reset();
        this.openSnackBar("Delivery Locations Edited Successfully","Close");
      }
      else
      {
        this.detailsForm.reset();
        while (this.locationForms.length !== 0) {
        this.locationForms.removeAt(0)
        }
        this.openSnackBar("Delivery Locations Inserted Successfully","Close");
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



import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdatetableService } from '../../../shared/service/updatetable.service';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators  } from '@angular/forms';
import { SettingsService } from '../../service/settings.service';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(public dialog: MatDialog,public apiService: SettingsService, private snackBar: MatSnackBar, private tableApi: UpdatetableService
    , private fb: FormBuilder) { }

    allDepts: any;
    myForm: FormGroup;
    toggleBool: Boolean = true;
    public apiData:any;
    public customerName:any;
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['customer','actionColumn'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {

    this.tableApi.readTableRow({tablename: 'departments'}).subscribe((data: {}) => {
      this.allDepts = data['success'];
      console.log(data['success']);
    });

    this.myForm = this.fb.group({
      department: ['', [
        Validators.required
      ]],
    });

  }

  changeSelect() {
    let createThis = {
      createData: this.myForm.value,
      tablename: 'customers'
     };
  
    this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
      this.apiData = data['success'] ;
      this.dataSource = new MatTableDataSource(this.apiData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  submitForm(){
    let createThis = {
      customer_name: this.customerName,
      dept_id: this.myForm.value,
      tablename: 'customers'
     };

     this.tableApi.createTableRow(createThis).subscribe((data: {}) => {
        this.apiData.push(data['success']);
        this.dataSource = new MatTableDataSource(this.apiData);
       this.openSnackBar(data['success']['customer'],"Inserted Successfully !!");
      
    });
     
  }


    //Row click Function to edit
    onClick(row: any) {
      console.log(row);
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '70%',
        position: { 'top': '8%' },
        data: { row: row, tableName: 'customers', id: row.id ,department_code:this.myForm.value,customer:row.customer}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result != null){
          let index: number = this.apiData.findIndex(d => d === row);
          this.dataSource.data[index]['customer'] = result;
          this.dataSource = new MatTableDataSource(this.dataSource.data);     
          this.openSnackBar(result,"Updated Successfully !!");
        }

      });
    }
  
  //Delete Row fucntion
  onClickDelete(row) {
    let deleteData = {
      tablename: 'customers',
      id: row.id
    };

    this.tableApi.deleteTableRow(deleteData).subscribe((data: {}) => {
      let index: number = this.apiData.findIndex(d => d === row);
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);
      this.openSnackBar(row['customer'],"Deleted Successfully !!");

    });

  }
  
    //Notification bar 
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 4000,
      });
    }
}



@Component({
  selector: 'customer-modal',
  templateUrl: 'customer-modal.html',
  styleUrls: ['./customers.component.css']
})
export class DialogOverviewExampleDialog implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, public updateTable: UpdatetableService,public apiService: SettingsService) { }

  public allProducts:any;
  public typeAheadDataProduct:any;
  public customerName:any;
  public newProducts = 0;

  onNoClick(): void {
    this.dialogRef.close();
  }

  public updateData() {

    let updateThis = {
      updateData: this.customerName,
      id: this.data['row']['id'],
      tablename: 'customers'
    };

    this.updateTable.updateTableRow(updateThis).subscribe((data: {}) => {
    });

  }

  ngOnInit() {

      this.apiService.getCustomerProducts({'customer_id':this.data['row']['id']}).subscribe((data: {}) => {
       this.allProducts = data['success'];
      });

      this.apiService.getTypeAheadDataProducts({'department_code':this.data['department_code']}).subscribe((data: {}) => {
        this.typeAheadDataProduct = data['success'];
       });

       this.customerName = this.data['row']['customer'];

      
  }


  changeProduct($event,rowId){

    let updateData = {
      id:rowId,
      product_id:$event.id
    };

    this.apiService.updateProductsForCustomers(updateData).subscribe((data: {}) => {
      console.log(data);
     });
  }

  addNewProducts(){
    this.newProducts++;
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

  deleteProduct(productObj){
    this.updateTable.deleteTableRow({id:productObj.id,tablename:'products'}).subscribe((data: {}) => {
      let index: number = this.allProducts.findIndex(d => d === productObj);
      this.allProducts.splice(index, 1);
    });
  }

  deleteArrayProduct(arrayItem){
    this.newProducts--;
  }

  addProduct($event){

    let addProduct = {
      product:$event.id,
      customer_id:this.data.id
    };

    this.apiService.addProductsForCustomers(addProduct).subscribe((data: {}) => {
     });

  }

}

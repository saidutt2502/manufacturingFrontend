import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UpdatetableService } from '../../../shared/service/updatetable.service';
import { CustomerserviceService } from '../../../customerservice/services/customerservice.service';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators  } from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  constructor(private tableApi: UpdatetableService, private fb: FormBuilder, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  view_orderForm: FormGroup;
  allDepts: any;
  allCustomers: any;
  allPos: any;

  displayedColumns: string[] = ['punching_date','po_number','status','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // date = new FormControl(new Date());
  

  ngOnInit() {

    this.tableApi.readTableRow({tablename: 'departments'}).subscribe((data: {}) => {
      this.allDepts = data['success'];
    });

    this.view_orderForm = this.fb.group({
      department: [,[
        Validators.required
      ]],
      customer: [,[
        Validators.required
      ]],
      // from_date: [,[
      //   Validators.required
      // ]],
      // to_date: [,[
      //   Validators.required
      // ]],
    });
  }

  departmentChange()
  {
    this.dataSource=null;  
    this.view_orderForm.patchValue({ customer: null });

    let createThis = {
      createData: this.view_orderForm.value,
      tablename: 'customers'
     };

     this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
      this.allCustomers = data['success'];
    });
  }

  customerChange(){
    this.dataSource=null;
    let createThis = {
      createData: this.view_orderForm.value,
      tablename: 'customers_po_details'
     };

    this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
      this.allPos = data['success'];
      this.dataSource = new MatTableDataSource(this.allPos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }); 
  }

  resetForm(){
    this.dataSource=null;
    this.view_orderForm.reset();
  }

  refreshTable(){
    let createThis = {
      createData: this.view_orderForm.value,
      tablename: 'customers_po_details'
     };

    this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
      this.allPos = data['success'];
      this.dataSource = new MatTableDataSource(this.allPos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onClickSelect()
  {
    const dialogRef = this.dialog.open(OrderviewModal, {
      width: '70%',
      data: {order_entry_data:this.view_orderForm.value}
    });
  }

  onClickCancel(row:any)
  {
    const dialogRef = this.dialog.open(CancelModal, {
      width: '70%',
      data: {cancel_entry_data:row}
    });

    

    dialogRef.afterClosed().subscribe(result => {
      if(result=='Cancelled')
      {
        let index: number = this.allPos.findIndex(d => d === row);
        this.dataSource.data[index]['status'] = result;
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.openSnackBar("PO Cancelled Successfully","Close"); 
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  

}

@Component({
  selector: 'cancel-modal',
  templateUrl: 'cancel-modal.html',
  styleUrls: ['./order-view.component.css']
})
export class CancelModal implements OnInit {

  public userName:any;
  name = this.data['cancel_entry_data']['po_number'];

  constructor(
    public dialogRef: MatDialogRef<CancelModal>,
    @Inject(MAT_DIALOG_DATA) public data: any, private currenttableApi: CustomerserviceService, private authenticationService: AuthenticationService) {dialogRef.disableClose = true;}

    

  ngOnInit() {
    //Setting Username Here
    this.userName = this.authenticationService.currentUserValue;
    this.userName = `${this.userName.id}`;
  }

  confirmCancel(){
    let createThis = {
      po_number: this.data['cancel_entry_data']['po_number'],
      user_id: this.userName,
      tablename: 'cancel_po'
     };

    this.currenttableApi.deleteTableValue(createThis).subscribe((data: {}) => {
      
    });
  }

}


@Component({
  selector: 'orderview-modal',
  templateUrl: 'orderview-modal.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderviewModal implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderviewModal>,
    @Inject(MAT_DIALOG_DATA) public data: any) {dialogRef.disableClose = true;}

  ngOnInit() {}
}

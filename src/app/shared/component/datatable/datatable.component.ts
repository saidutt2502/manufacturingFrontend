import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { UpdatetableService } from '../../service/updatetable.service';



/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  dataSource: MatTableDataSource<any>;

  //Data Passed from components
  @Input() colData: any;
  @Input() tableName: string;

  public apiData:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  public columnsToDisplay = new Array();

  str: any;
  code_check:Boolean = false;

    //Form Data to be passed
    public insertForm: FormGroup;

    objectKeys = Object.keys;

  constructor(public dialog: MatDialog, public updateTable: UpdatetableService,private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    
    this.updateTable.readTableRow({tablename:this.tableName}).subscribe((data: {}) => {
    this.apiData = data['success'] ;
    this.dataSource = new MatTableDataSource(this.apiData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });


    // Assign the data to the data source for the table to render
    for (const eachField of this.objectKeys(this.colData))
    {
      this.columnsToDisplay.push(eachField);
    }

    this.columnsToDisplay.push('actionColumn');

    

    const formData = {};
    for (const eachField of this.objectKeys(this.colData)) {
      formData[eachField] = new FormControl("",[Validators.required]);
    }
    this.insertForm = new FormGroup(formData);

  }

  //Insert
  submitForm(){

    if(this.tableName=='departments')
    {
      let createThis = {
        createData: this.insertForm.value,
        tablename: this.tableName
       };

       this.updateTable.checkTableRow(createThis).subscribe((data: {}) => {
        if(data['success']!=0)
        {
          this.code_check = true;
        }
        else
        {
          let createThis = {
            createData: this.insertForm.value,
            tablename: this.tableName
           };
      
      
           this.updateTable.createTableRow(createThis).subscribe((data: {}) => {
            this.apiData.push(data['success']);
            this.dataSource = new MatTableDataSource(this.apiData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.insertForm.reset();
            this.str=this.tableName.substring(0, this.tableName.length - 1);
            this.openSnackBar(this.str[0].toUpperCase()+this.str.slice(1)+" Inserted Successfully","Close");
            this.str="";
            this.code_check = false;
          });
        }
     });
    }
    else
    {
      let createThis = {
        createData: this.insertForm.value,
        tablename: this.tableName
       };
  
  
       this.updateTable.createTableRow(createThis).subscribe((data: {}) => {
          this.apiData.push(data['success']);
          this.dataSource = new MatTableDataSource(this.apiData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.insertForm.reset();
          this.str=this.tableName.substring(0, this.tableName.length - 1);
          this.openSnackBar(this.str[0].toUpperCase()+this.str.slice(1)+" Inserted Successfully","Close");
          this.str="";
      })
    } 
  }

  //Reset
  resetForm(){
    this.insertForm.reset();
    this.code_check=false;
  }

  //Search Bar
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Delete Function
  onClickDelete(row: any){
    const dialogRef = this.dialog.open(DeleteModal, {
      width: '70%',
      data: {delete_entry_data:row,table_name:this.tableName,id:row.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result=='Deleted')
      {
      let index: number = this.apiData.findIndex(d => d === row);
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.str=this.tableName.substring(0, this.tableName.length - 1);
      this.openSnackBar(this.str[0].toUpperCase()+this.str.slice(1)+" Deleted Successfully","Close");
      this.str="";
      } 
    });
  }

  //Edit Function
  onClickEdit(row: any) {
    const dialogRef = this.dialog.open(EditModal, {
      width: '70%',
      data: { edit_entry_data: row, table_name: this.tableName, col: this.colData, id: row.id }
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
        this.str=this.tableName.substring(0, this.tableName.length - 1);
        this.openSnackBar(this.str[0].toUpperCase()+this.str.slice(1)+" Updated Successfully","Close");
        this.str="";     
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

@Component({
  selector: 'delete-modal',
  templateUrl: 'delete-modal.html',
})
export class DeleteModal implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteModal>,
    @Inject(MAT_DIALOG_DATA) public data: any, public updateTable: UpdatetableService) {dialogRef.disableClose = true;}

  str: any = this.data['table_name'];
  object = this.str.substring(0, this.str.length - 1);
  object_name = this.object[0].toUpperCase()+this.object.slice(1);
  name=this.data['delete_entry_data']['name'];
 
 
  ngOnInit() {}

  confirmDelete(){
    let createThis = {
      id: this.data['id'],
      tablename: this.data['table_name']
     };

    this.updateTable.deleteTableRow(createThis).subscribe((data: {}) => {

    });
  }
}


@Component({
  selector: 'edit-modal',
  templateUrl: 'edit-modal.html',
})
export class EditModal implements OnInit {

//   //Form Data to be passed
  public form: FormGroup;

  objectKeys = Object.keys;
  colData = this.data['col'];
  code_check: Boolean = false;

  str: any = this.data['table_name'];
  object = this.str.substring(0, this.str.length - 1);
  object_name = this.object[0].toUpperCase()+this.object.slice(1);
  existing_code = this.data['edit_entry_data']['code'];

  constructor(
    public dialogRef: MatDialogRef<EditModal>,
    @Inject(MAT_DIALOG_DATA) public data: any, public updateTable: UpdatetableService) {dialogRef.disableClose = true;}


  ngOnInit() {

    const formData = {};
    for (const eachField of this.objectKeys(this.data['col'])) {
      formData[eachField] = new FormControl(this.data['edit_entry_data'][eachField],[Validators.required]);
    }
    this.form = new FormGroup(formData);
  }

  confirmEdit(){

    if(this.data['table_name']=='departments')
    {
      let createThis = {
              createData: this.form.value,
              tablename: this.data['table_name']
      };

      if(this.existing_code==this.form.value['code'])
      {
        let updateThis = {
          updateData: this.form.value,
          id: this.data['id'],
          tablename: this.data['table_name']
        };
    
        this.updateTable.updateTableRow(updateThis).subscribe((data: {}) => {
        });
      }
      else
      {
        this.updateTable.checkTableRow(createThis).subscribe((data: {}) => {
          if(data['success']!=0)
          {
            this.code_check = true;
          }
          else
          {
            let updateThis = {
              updateData: this.form.value,
              id: this.data['id'],
              tablename: this.data['table_name']
            };
        
            this.updateTable.updateTableRow(updateThis).subscribe((data: {}) => {
            });
          }
        });
      }
    }
    else
    {
      let updateThis = {
        updateData: this.form.value,
        id: this.data['id'],
        tablename: this.data['table_name']
      };
  
      this.updateTable.updateTableRow(updateThis).subscribe((data: {}) => {
      });
    }

    
  }

}
import { Component, OnInit, Inject, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  @Output() clickRow = new EventEmitter();

  dataSource: MatTableDataSource<any>;

  //Data Passed from components
  @Input() rowData: any;
  @Input() colData: any;
  @Input() tableName: string;



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public columnsToDisplay: string[];

  constructor(public dialog: MatDialog, public updateTable: UpdatetableService,private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    // Assign the data to the data source for the table to render
    this.columnsToDisplay = this.colData.concat(['actionColumn']);
    this.dataSource = new MatTableDataSource(this.rowData);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Row click Function to edit
  onClick(row: any) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '70%',
      position: { 'top': '8%' },
      data: { row: row, tableName: this.tableName, col: this.colData, id: row.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      let index: number = this.rowData.findIndex(d => d === row);
      for (var eachUpdatedColumn in result) {
        this.dataSource.data[index][eachUpdatedColumn] = result[eachUpdatedColumn];
      }
      this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);     
      this.openSnackBar(result['name'],"Updated Successfully !!")
    });
  }

  //Delete Row fucntion
  onClickDelete(row) {
    let deleteData = {
      tablename: this.tableName,
      id: row.id
    };

    this.updateTable.deleteTableRow(deleteData).subscribe((data: {}) => {

      let index: number = this.rowData.findIndex(d => d === row);
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);
      this.openSnackBar(row['name'],"Deleted Successfully !!")

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
  selector: 'dataTable-modal',
  templateUrl: 'datatable-model.html',
})
export class DialogOverviewExampleDialog implements OnInit {

  //Form Data to be passed
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, public updateTable: UpdatetableService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public updateData() {

    let updateThis = {
      updateData: this.form.value,
      id: this.data['row']['id'],
      tablename: this.data['tableName']
    };

    this.updateTable.updateTableRow(updateThis).subscribe((data: {}) => {
    });

  }

  ngOnInit() {
    const formData = {};
    for (const eachField of this.data['col']) {
      formData[eachField] = new FormControl(this.data['row'][eachField]);
    }
    this.form = new FormGroup(formData);
  }

}
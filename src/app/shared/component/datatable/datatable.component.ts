import { Component, OnInit, Inject, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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

  constructor(public dialog: MatDialog, public updateTable: UpdatetableService) {
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


  onClick(row: any) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '70%',
      position: { 'top': '8%' },
      data: { row: row, tableName: this.tableName }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }

  onClickDelete(row) {

    let deleteData = {
      tablename: this.tableName,
      id: row.id
    };

    this.updateTable.deleteTableRow(deleteData).subscribe((data: {}) => {

      let index: number = this.rowData.findIndex(d => d === row);
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);

    });

  }
}


@Component({
  selector: 'dataTable-modal',
  templateUrl: 'datatable-model.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, public updateTable: UpdatetableService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public updateData() {
    //console.log(myForm);
    //  this.updateTable.updateTableRow(data).subscribe((data: {}) => {
    //  });
  }


}
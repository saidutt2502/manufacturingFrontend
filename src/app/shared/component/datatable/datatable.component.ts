import {Component, OnInit, ViewChild , Input, Output, EventEmitter} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  @Output() clickRow= new EventEmitter();

  dataSource: MatTableDataSource<any>;

  //Data Passed from components
  @Input() rowData: any;
  @Input() colData: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  ngOnInit() {

    // Assign the data to the data source for the table to render
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

  onClick(row:any){
    this.clickRow.emit(row);
  } 
}

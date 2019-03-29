import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

import { SelectionModel } from '@angular/cdk/collections';

const ELEMENT_DATA = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'userlocation',
  templateUrl: './userlocation.component.html',
  styleUrls: ['./userlocation.component.css']
})
export class UserlocationComponent implements OnInit {

  constructor() { }

  displayedColumns = ['name','select'];
  data = Object.assign( ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.data);
  selection = new SelectionModel<Element>(true, []);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
     let index: number = this.data.findIndex(d => d === item);
     console.log(this.data.findIndex(d => d === item));
     this.dataSource.data.splice(index,1);

     this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);
   });
   this.selection = new SelectionModel<Element>(true, []);
 }

}

import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material';
import { SettingsService } from '../../services/settings.service';

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

  constructor(public settingsApi:SettingsService,private snackBar: MatSnackBar) { }

  displayedColumns : any ;
  dataSource: MatTableDataSource<any>;
  locationIdKey:any;
  allData:any;
  locationsCols:any;
  selection = new SelectionModel(true, []);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.settingsApi.user2location().subscribe((data: {}) => {
      this.allData = Object.assign(data['success']);
      this.locationIdKey = data['allLocations'];
      this.locationsCols = Object.keys(data['allLocations']);
      this.displayedColumns = Object.keys(this.allData[0]);
      this.dataSource = new MatTableDataSource(this.allData);
  });

  }

  changeLocation(userId,locationId,checked,username,location){
        this.settingsApi.assignLocation2Users({'userId':userId,'locationId':locationId,'checked':checked}).subscribe((data: {}) => {
          if(checked ==  true ){
              this.snackBar.open(username+" <-> "+location , "Added Successfully !!", {
                duration: 4000,
              });
          }else{
            this.snackBar.open(username+" <-> "+location , "Removed Successfully !!", {
              duration: 4000,
            });
          }
         
     });
  }

}

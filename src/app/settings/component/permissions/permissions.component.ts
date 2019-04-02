import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material';

import { SettingsService } from '../../service/settings.service'
@Component({
  selector: 'permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  displayedColumns : any ;
  dataSource: MatTableDataSource<any>;
  permissionIdKey:any;
  allData:any;
  permissionCols:any;
  selection = new SelectionModel(true, []);


  constructor(public apiService:SettingsService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.apiService.getUserPermissions().subscribe((data: {}) => {
        this.allData = Object.assign(data['success']);
        this.permissionIdKey = data['allPermission'];
        this.permissionCols = Object.keys(data['allPermission']);
        this.displayedColumns = Object.keys(this.allData[0]);
        this.dataSource = new MatTableDataSource(this.allData);
    });

  }

  changePermission(userId,permissionId,checked,username,permission){
    this.apiService.assignPermission2Users({'userId':userId,'permissionId':permissionId,'checked':checked}).subscribe((data: {}) => {
      if(checked ==  true ){
          this.snackBar.open(username+" <-> "+permission , "Added Successfully !!", {
            duration: 4000,
          });
      }else{
        this.snackBar.open(username+" <-> "+permission , "Removed Successfully !!", {
          duration: 4000,
        });
      }
     
 });
}

}

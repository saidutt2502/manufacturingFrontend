import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material';
import { UpdatetableService } from '../../../shared/service/updatetable.service';
import { FormBuilder, FormGroup, FormArray, Validators  } from '@angular/forms';

import { SettingsService } from '../../service/settings.service'
@Component({
  selector: 'permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  displayedColumns: any ;
  dataSource: MatTableDataSource<any>;
  permissionIdKey: any;
  allData: any;
  permissionCols: any;
  selection = new SelectionModel(true, []);
  allDepts: any;
  myForm: FormGroup;
  toggleBool: Boolean = true;


  constructor(public apiService: SettingsService, private snackBar: MatSnackBar, private tableApi: UpdatetableService
  , private fb: FormBuilder) { }

  ngOnInit() {
    this.apiService.getUserwithoutPermissions().subscribe((data: {}) => {
      this.allData = Object.assign(data['success']);
      this.permissionIdKey = data['allPermission'];
      this.permissionCols = Object.keys(data['allPermission']);
      this.displayedColumns = Object.keys(this.allData[0]);
      this.dataSource = new MatTableDataSource(this.allData);
  });


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


  changePermission(userId,permissionId,checked,username,permission){
    this.apiService.assignPermission2Users({'departmentId':this.myForm.value['department'],'userId':userId,
    'permissionId':permissionId,'checked':checked}).subscribe((data: {}) => {
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

changeSelect() {
  this.toggleBool = false;
  this.apiService.getUserPermissions(this.myForm.value).subscribe((data: {}) => {
    this.allData = Object.assign(data['success']);
    this.permissionIdKey = data['allPermission'];
    this.permissionCols = Object.keys(data['allPermission']);
    this.displayedColumns = Object.keys(this.allData[0]);
    this.dataSource = new MatTableDataSource(this.allData);
});
}

}

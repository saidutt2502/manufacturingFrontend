import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators  } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UpdatetableService } from '../../../shared/service/updatetable.service';
import { SettingsService } from '../../service/settings.service';
import {MatSnackBar} from '@angular/material';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'sub-assemblies',
  templateUrl: './sub-assemblies.component.html',
  styleUrls: ['./sub-assemblies.component.css']
})
export class SubAssembliesComponent implements OnInit {

  myForm: FormGroup;
  allDepts: any;
  public apiData: any;

  dataSource: MatTableDataSource<any>;

  constructor(private fb: FormBuilder, private tableApi: UpdatetableService, public updateTable: SettingsService
    , private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      // email: ['', [
      //   Validators.required, Validators.email
      // ]],
      department: ['', [
        Validators.required
      ]],
      phones: this.fb.array([
        this.fb.group({
          areanumber: []
        })
      ])
    });

    this.tableApi.readTableRow({tablename: 'departments'}).subscribe((data: {}) => {
      this.allDepts = data['success'];
      console.log(data['success']);
    });
  }

  get phoneForms() {
    return this.myForm.get('phones') as FormArray;
  }

  addArea() {
    const phone = this.fb.group({
      areanumber: []
    })
  
    this.phoneForms.push(phone);
  }
  
  deleteArea(i) {
    this.phoneForms.removeAt(i);
  }

  

  submitForm(){
    let createThis = {
      createData: this.myForm.value,
      tablename: 'sub_assemblies'
     };

    this.updateTable.createTableInsert(createThis).subscribe((data: {}) => {
    this.openSnackBar(data['success']['name'],"Inserted Successfully !!");

    });
  }

    //Notification bar 
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 4000,
      });
    }

}

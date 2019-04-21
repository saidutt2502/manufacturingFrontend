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
  allAssemblies: any;
  assembly_check: any;
  public apiData: any;

  dataSource: MatTableDataSource<any>;

  constructor(private fb: FormBuilder, private tableApi: UpdatetableService, public updateTable: SettingsService
    , private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      department: [,[
        Validators.required
      ]],
      assemblies: this.fb.array([])
    });

    this.tableApi.readTableRow({tablename: 'departments'}).subscribe((data: {}) => {
      this.allDepts = data['success'];
      console.log(data['success']);
    });
  }

  get assemblyForms() {
    return this.myForm.get('assemblies') as FormArray;
  }

  addAssembly() {
    this.assembly_check=false;
    const assembly = this.fb.group({
      assembly_name: ['', [
        Validators.required
      ]]
    })
  
    this.assemblyForms.push(assembly);
  }
  
  deleteAssembly(i) {
    this.assemblyForms.removeAt(i);
  }

  //Insert
  submitForm(){
    let createThis = {
      createData: this.myForm.value,
      tablename: 'subassemblies'
     };

    this.updateTable.createTableInsert(createThis).subscribe((data: {}) => {
      if(data['success']=='undefined')
      {
        this.assembly_check=true;
      }
      else if(data['success']=='last_entry_delete')
      {
        this.myForm.reset();
        this.openSnackBar("Sub Assemblies Edited Successfully","Close");
      }
      else
      {
        this.myForm.reset();
        while (this.assemblyForms.length !== 0) {
        this.assemblyForms.removeAt(0)
        }
        this.openSnackBar("Sub Assemblies Inserted Successfully","Close");
      }
    });
  }

  changeDepartment(){

    this.assembly_check=false;

    while (this.assemblyForms.length !== 0) {
      this.assemblyForms.removeAt(0)
    }

    let createThis = {
      createData: this.myForm.value,
      tablename: 'subassemblies'
     };

    this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
      this.allAssemblies = data['success'];
      for(var each_assembly of this.allAssemblies)
      {
          const assembly_variable = this.fb.group({
            assembly_name: [each_assembly['name'], [
              Validators.required
            ]]
          })
        
          this.assemblyForms.push(assembly_variable);
        }
    });
  }

  resetForm(){
    this.myForm.reset();
    this.assembly_check=false;
    while (this.assemblyForms.length !== 0) {
      this.assemblyForms.removeAt(0)
    }
  }

    //Notification bar 
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 4000,
      });
    }

}

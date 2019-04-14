import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators  } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UpdatetableService } from '../../../shared/service/updatetable.service';
import { SettingsService } from '../../service/settings.service';
import {MatSnackBar} from '@angular/material';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css']
})
export class LinesComponent implements OnInit {

  myForm: FormGroup;
  allDepts: any;
  allLines: any;
  public apiData: any;

  dataSource: MatTableDataSource<any>;

  constructor(private fb: FormBuilder, private tableApi: UpdatetableService, public updateTable: SettingsService
    , private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      department: [[
        Validators.required
      ]],
      lines: this.fb.array([])
    });

    this.tableApi.readTableRow({tablename: 'departments'}).subscribe((data: {}) => {
      this.allDepts = data['success'];
      console.log(data['success']);
    });
  }

  get lineForms() {
    return this.myForm.get('lines') as FormArray;
  }

  addLine() {
    const line = this.fb.group({
      line_name: ['', [
        Validators.required
      ]]
    })
  
    this.lineForms.push(line);
  }
  
  deleteLine(i) {
    this.lineForms.removeAt(i);
  }

  submitForm(){
    let createThis = {
      createData: this.myForm.value,
      tablename: 'lines'
     };

    this.updateTable.createTableInsert(createThis).subscribe((data: {}) => {
    this.openSnackBar("Lines Inserted Successfully","Close");
    });
  }

  changeDepartment(){

    while (this.lineForms.length !== 0) {
      this.lineForms.removeAt(0)
    }

    let createThis = {
      createData: this.myForm.value,
      tablename: 'lines'
     };

    this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
      this.allLines = data['success'];
      for(var each_line of this.allLines)
      {
          const line_variable = this.fb.group({
            line_name: [each_line['name'], [
              Validators.required
            ]]
          })
        
          this.lineForms.push(line_variable);
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

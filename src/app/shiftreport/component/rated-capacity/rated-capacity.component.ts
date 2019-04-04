import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators  } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UpdatetableService } from '../../../shared/service/updatetable.service';
import {MatSnackBar} from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { ShiftreportService } from '../../services/shiftreport.service';

@Component({
  selector: 'rated-capacity',
  templateUrl: './rated-capacity.component.html',
  styleUrls: ['./rated-capacity.component.css']
})
export class RatedCapacityComponent implements OnInit {

  myForm: FormGroup;
  allDepts: any;
  allLines: any;
  allProducts: any;
  public apiData: any;

  dataSource: MatTableDataSource<any>;

  constructor(private fb: FormBuilder, private tableApi: UpdatetableService, private snackBar: MatSnackBar,
    public updateTable: ShiftreportService) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      // email: ['', [
      //   Validators.required, Validators.email
      // ]],
      department: ['', [
        Validators.required
      ]],
      capacities: this.fb.array([
        this.fb.group({
          line: [],
          product: [],
          output: [],
          headcount: []
        })
      ])
    });

    this.tableApi.readTableRow({tablename: 'departments'}).subscribe((data: {}) => {
      this.allDepts = data['success'];
      console.log(data['success']);
    });
  }
  get capacityForms() {
    return this.myForm.get('capacities') as FormArray;
  }

  addArea() {
    const capacity = this.fb.group({
      line: [],
      product: [],
      output: [],
      headcount: []
    })
  
    this.capacityForms.push(capacity);
  }
  
  deleteArea(i) {
    this.capacityForms.removeAt(i);
  }

  changeSelect() {
    let createLines = {
      createData: this.myForm.value,
      tablename: 'lines'
     };

     let createProducts = {
      createData: this.myForm.value,
      tablename: 'products'
     };

    this.tableApi.readTableRow(createLines).subscribe((data: {}) => {
      this.allLines = data['success'];
      console.log(data['success']);
    });

    this.tableApi.readTableRow(createProducts).subscribe((data: {}) => {
      this.allProducts = data['success'];
      console.log(data['success']);
    });
  }

  submitForm(){
    this.updateTable.createTableCapacity(this.myForm.value).subscribe((data: {}) => {
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

import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { UpdatetableService } from '../../../shared/service/updatetable.service';
import { TrackerService } from '../../../shared/service/tracker.service';
import { CustomerserviceService } from '../../../customerservice/services/customerservice.service';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators  } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {MatSnackBar} from '@angular/material';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment} from 'moment';

const moment =  _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM-YYYY',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class TrackerComponent implements OnInit {

  constructor(private trackerApi:TrackerService ,private tableApi: UpdatetableService,private currenttableApi: CustomerserviceService, private fb: FormBuilder,private datePipe : DatePipe, private snackBar: MatSnackBar) {}
  allDepts: any;
  allCustomers: any;
  allPos: any;
  allItemCode:any;
  trackerForm: FormGroup;
  trackerApiData:any;
  trackerColumnsApiData:any;

  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }


  ngOnInit() {
    this.tableApi.readTableRow({tablename: 'departments'}).subscribe((data: {}) => {
      this.allDepts = data['success'];
    });

    this.trackerForm = this.fb.group({
      department: [,[
        Validators.required
      ]],
      customer: [,[
        Validators.required
      ]],
      po_number: [,[
        Validators.required
      ]],
      item_code: [,[
        Validators.required
      ]]
    });

    

  }

  departmentChange()
  {
    this.trackerForm.patchValue({ customer: null , po_number: null , item_code: null });
    this.allPos = null;
    this.allItemCode = null;

    let createThis = {
      createData: this.trackerForm.value,
      tablename: 'customers'
     };

     this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
      this.allCustomers = data['success'];
    });
  }


  customerChange(){

    this.trackerForm.patchValue({ po_number: null ,item_code: null  });
    this.allItemCode = null;

    let createThis = {
      createData: this.trackerForm.value,
      tablename: 'customers_po'
     };

    this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
      this.allPos = data['success'];
    });
  }


  poNumberChange(){

    this.trackerForm.patchValue({ item_code: null });
    this.allItemCode = null;

    let createThis = {
      createData: this.trackerForm.value,
      tablename: 'po_products'
     };

     this.tableApi.readTableRow(createThis).subscribe((data: {}) => {
     this.allItemCode = data['success'];
    });
  }

  getTrackerData(){
    let trackerData = {
      createData: this.trackerForm.value,
      date:this.datePipe.transform(this.date.value, 'MM-yyyy'),
     };

     this.trackerApi.getDateColumnsTracker({date:this.datePipe.transform(this.date.value, 'MM-yyyy')}).subscribe((data: {}) => {
      this.trackerColumnsApiData = data;
    });

     this.trackerApi.createGetTracker(trackerData).subscribe((data: {}) => {
      this.trackerApiData = data['success'];
    });


  }

  updateTrackerDateValues(event,id){
    this.trackerApi.editTrackerValues({id:id,value:event.target.value}).subscribe((data: {}) => {
      if(data['success']){
        this.openSnackBar("Tracker Updated Successfully","Close"); 
      }
    });

  }


  resetForm(){
    this.trackerForm.reset();
    this.allPos = null;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}


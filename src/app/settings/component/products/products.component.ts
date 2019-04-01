import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators  } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UpdatetableService } from '../../../shared/service/updatetable.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  myForm: FormGroup;
  allDepts:any;

  constructor(private fb: FormBuilder,private tableApi:UpdatetableService) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      email: ['', [
        Validators.required, Validators.email
      ]],
      department: ['', [
        Validators.required
      ]],
      phones: this.fb.array([
        this.fb.group({ 
          areanumber: []
        })
      ])
    });

    this.tableApi.readTableRow({tablename:'departments'}).subscribe((data: {}) => {
      this.allDepts = data['success'];
      console.log(data['success']);
    });
  }

  get phoneForms() {
    return this.myForm.get('phones') as FormArray
  }
  
  addArea() {
    const phone = this.fb.group({ 
      areanumber: []
    })
  
    this.phoneForms.push(phone);
  }
  
  deleteArea(i) {
    this.phoneForms.removeAt(i)
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  public col: any = {name:'Department Name', code:'Product Code'};
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public col: string[] = ['emp_id','name','email','password'];

  constructor() { }

  ngOnInit() {
  }

}

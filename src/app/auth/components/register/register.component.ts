import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerData:any = {
    email:'',
    password:'',
    user_type_id:'',
    emp_id:'',
    name:''
  }

  constructor(private router: Router,private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  public submitForm(){
    this.authenticationService.register(this.registerData)
    .pipe(first())
    .subscribe(
        data => {
          //this.router.navigate(['auth/login']);
        },
        error => {
          console.log(error);
          alert('error');
        });
  }

}

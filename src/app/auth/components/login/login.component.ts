import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';


import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public returnUrl: string;

  constructor(private route: ActivatedRoute,private router: Router,private authenticationService: AuthenticationService,) { 

        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public submitForm(){
    this.authenticationService.login('asdasdasd','asdasdasd')
    .pipe(first())
    .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          alert('error');
        });

        this.router.navigate([this.returnUrl]);
  }

}

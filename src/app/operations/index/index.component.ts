import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/services/authentication.service';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public userEmail :any;
  public operationsLink :any;

  constructor(private authenticationService: AuthenticationService) {
      this.userEmail = `${this.authenticationService.currentUserValue.email}`;
      this.operationsLink = "http://localhost:4300/"+this.userEmail;
   }

  ngOnInit() {
  }

}

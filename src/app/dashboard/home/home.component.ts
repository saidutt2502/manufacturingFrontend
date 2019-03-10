import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../service/home-service.service'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public homeapi:HomeServiceService) { }

  ngOnInit() {
    console.log(localStorage.getItem('currentUser'));
    
    this.homeapi.userInfo().subscribe((data: {}) => {
      console.log(data);
    });
  }

}

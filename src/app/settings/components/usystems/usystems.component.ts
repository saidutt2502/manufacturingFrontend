import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'usystems',
  templateUrl: './usystems.component.html',
  styleUrls: ['./usystems.component.css']
})
export class UsystemsComponent implements OnInit {

  public col: string[] = ['name'];

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SettingsService } from '../../services/settings.service'

@Component({
  selector: 'locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  public location = new FormControl('', [Validators.required]);

  public col: string[] = ['name'];
  public rows:any;

  constructor( public settingsApi:SettingsService,public dialog: MatDialog) { }

  ngOnInit() {
    this.settingsApi.getLocation().subscribe((data: {}) => {
      this.rows = data['success'];
    });
  }

  getErrorMessage() {
    return this.location.hasError('required') ? 'You must enter a value':'';
  }

  public addLocation(){

      let locationData = {
        location:this.location.value
      };

    this.settingsApi.addLocation(locationData).subscribe((data: {}) => {
    });

  }

}



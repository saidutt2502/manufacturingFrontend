import { Component, OnInit } from '@angular/core';
import { UpdatetableService } from '../../../shared/service/updatetable.service';
import { SettingsService } from '../../services/settings.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'hodlocation',
  templateUrl: './hodlocation.component.html',
  styleUrls: ['./hodlocation.component.css']
})
export class HodlocationComponent implements OnInit {

 public allsysHod : any;
 public allLocations : any;
 public allLocationsKeys : any;
 public allUsers = [];


  constructor(public settingsApi:SettingsService,public updateTable: UpdatetableService,private snackBar: MatSnackBar) { 
  }

  ngOnInit() {
      this.settingsApi.location2systems2users().subscribe((data: {}) => {
        this.allsysHod = data['success'];
        this.allLocations = data['locations'];
        this.allLocationsKeys = Object.keys(this.allLocations);
    });

    this.updateTable.readTableRow({tablename:'users'}).subscribe((data: {}) => {
     this.allUsers = data['success'];
  });

  }

  changeHod(event,locid,sysid,userName,locationName,system) {
      let updateData = {
        sysId:sysid,
        hodId:event.id,
        locId:locid
      };

    this.settingsApi.changeHod(updateData).subscribe((data: {}) => {
        this.snackBar.open(userName+" <-> "+system+"("+locationName+")", "Assigned Successfully !!", {
          duration: 6000,
        });
   });
}

}

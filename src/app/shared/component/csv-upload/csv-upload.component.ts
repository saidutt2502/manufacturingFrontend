import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthenticationService } from '../../../auth/services/authentication.service';

//Importing Global variables
import * as global from '../../../global'; 

//Upload CSV URL;
const URL = global.apiUrl+'/csv/uploadCSV';

@Component({
  selector: 'csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.css']
})
export class CsvUploadComponent implements OnInit {
  public currentUser = this.authenticationService.currentUserValue;
  public uploader:FileUploader = new FileUploader({url: URL,authToken: `Bearer ${this.currentUser.token}`});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("Upload successfully");
    };
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}

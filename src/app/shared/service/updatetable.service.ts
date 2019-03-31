import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

//Importing Global variables
import * as global from '../../global'; 

@Injectable({
  providedIn: 'root'
})
export class UpdatetableService {

    //Setting API call URL from Global File
      private url = global.apiUrl;

  private extractData(res: Response) {
    let body = res;
    return body || {};
}

  constructor(private http: HttpClient) { }

  public readTableRow(data):Observable<any> {
    return this.http.post(this.url+'/shared/readTableRow',data).pipe(
      map(this.extractData));
  }

  public createTableRow(data):Observable<any> {
    return this.http.post(this.url+'/shared/createTableRow',data).pipe(
      map(this.extractData));
  }

  public updateTableRow(data):Observable<any> {
    return this.http.post(this.url+'/shared/updateTableRow',data).pipe(
      map(this.extractData));
  }

  public deleteTableRow(data):Observable<any> {
    return this.http.post(this.url+'/shared/deleteTableRow',data).pipe(
      map(this.extractData));
  }
}

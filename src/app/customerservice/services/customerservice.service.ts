import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

// Importing Global variables
import * as global from '../../global';

@Injectable({
  providedIn: 'root'
})
export class CustomerserviceService {

 // Setting API call URL from Global File
 private url = global.apiUrl;

 private extractData(res: Response) {
   let body = res;
   return body || {};
}

 constructor(private http: HttpClient) { }

 public createTableInsert(data): Observable<any> {
   return this.http.post(this.url + '/customerservice/createTableInsert',data).pipe(
     map(this.extractData));
 }

 public editTableValue(data): Observable<any> {
  return this.http.post(this.url + '/customerservice/editTableValue',data).pipe(
    map(this.extractData));
}

 public existsTableValue(data): Observable<any> {
  return this.http.post(this.url + '/customerservice/existsTableValue',data).pipe(
    map(this.extractData));
 }

 public deleteTableValue(data): Observable<any> {
  return this.http.post(this.url + '/customerservice/deleteTableValue',data).pipe(
    map(this.extractData));
 }

}

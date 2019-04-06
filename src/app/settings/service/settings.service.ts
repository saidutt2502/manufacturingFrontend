import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

// Importing Global variables
import * as global from '../../global';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // Setting API call URL from Global File
  private url = global.apiUrl;

  private extractData(res: Response) {
    let body = res;
    return body || {};
}

  constructor(private http: HttpClient) { }

  public createTableInsert(data): Observable<any> {
    return this.http.post(this.url + '/department/createTableInsert',data).pipe(
      map(this.extractData));
  }

  public getUserPermissions(data): Observable<any> {
    return this.http.post(this.url + '/department/user2permission', data).pipe(
      map(this.extractData));
  }

  public getUserwithoutPermissions(): Observable<any> {
    return this.http.get(this.url + '/department/userwithoutpermission').pipe(
      map(this.extractData));
  }

  public assignPermission2Users(data): Observable<any> {
    return this.http.post(this.url + '/department/assignPermission2Users',data).pipe(
      map(this.extractData));
  }

  public getCustomerProducts(data): Observable<any> {
    return this.http.post(this.url + '/department/getCustomerProducts',data).pipe(
      map(this.extractData));
  }

  public getTypeAheadDataProducts(data): Observable<any> {
    return this.http.post(this.url + '/department/getTypeAheadDataProducts',data).pipe(
      map(this.extractData));
  }

  public updateProductsForCustomers(data): Observable<any> {
    return this.http.post(this.url + '/department/updateProductsForCustomers',data).pipe(
      map(this.extractData));
  }

  public addProductsForCustomers(data): Observable<any> {
    return this.http.post(this.url + '/department/addProductsForCustomers',data).pipe(
      map(this.extractData));
  }

}

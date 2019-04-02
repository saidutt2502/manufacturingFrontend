import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

//Importing Global variables
import * as global from '../../global'; 

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //Setting API call URL from Global File
  private url = global.apiUrl;

  private extractData(res: Response) {
    let body = res;
    return body || {};
}

  constructor(private http: HttpClient) { }

  public createTableProduct(data):Observable<any> {
    return this.http.post(this.url+'/department/createTableProduct',data).pipe(
      map(this.extractData));
  }

  public createTableLine(data):Observable<any> {
    return this.http.post(this.url+'/department/createTableLine',data).pipe(
      map(this.extractData));
  }

}

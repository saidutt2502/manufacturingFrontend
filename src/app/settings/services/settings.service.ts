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

  public user2location():Observable<any> {
    return this.http.get(this.url+'/settings/user2location').pipe(
      map(this.extractData));
  }

  public assignLocation2Users(data):Observable<any> {
    return this.http.post(this.url+'/settings/assignLocation2Users',data).pipe(
      map(this.extractData));
  }

  public location2systems2users():Observable<any> {
    return this.http.get(this.url+'/settings/location2systems2users').pipe(
      map(this.extractData));
  }

  public changeHod(data):Observable<any> {
    return this.http.post(this.url+'/settings/changeHod',data).pipe(
      map(this.extractData));
  }

}

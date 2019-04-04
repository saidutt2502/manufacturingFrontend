import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

// Importing Global variables
import * as global from '../../global';

@Injectable({
  providedIn: 'root'
})
export class ShiftreportService {

  // Setting API call URL from Global File
  private url = global.apiUrl;

  private extractData(res: Response) {
    let body = res;
    return body || {};
}

  constructor(private http: HttpClient) { }
  
  public createTableCapacity(data):Observable<any> {
    return this.http.post(this.url+'/shiftreport/createTableCapacity',data).pipe(
      map(this.extractData));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {


  private extractData(res: Response) {
    let body = res;
    return body || {};
}

  constructor(private http: HttpClient) { }


}

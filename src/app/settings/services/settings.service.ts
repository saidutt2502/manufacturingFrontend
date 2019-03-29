import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private url = "http://127.0.0.1:8000/api";

  private extractData(res: Response) {
    let body = res;
    return body || {};
}

  constructor(private http: HttpClient) { }

  public getLocation():Observable<any> {
    return this.http.get(this.url+'/settings/getLocations').pipe(
      map(this.extractData));
  }

}

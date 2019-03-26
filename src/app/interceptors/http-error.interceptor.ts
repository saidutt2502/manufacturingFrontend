import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
   } from '@angular/common/http';
   import { Observable, throwError } from 'rxjs';
   import { retry, catchError } from 'rxjs/operators';
   import { ToastrService } from 'ngx-toastr';
   
   @Injectable()
   export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(public toasterService: ToastrService) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
           // window.alert(errorMessage);
            this.toasterService.error(errorMessage, "Error");
            return throwError(errorMessage);
          })
        )
    }
   }
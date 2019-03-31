import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../users';

//Importing Global variables
import * as global from '../../global'; 

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    //Setting API call URL from Global File
    private url = global.apiUrl;

    constructor(private http: HttpClient, private router: Router,) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('opsUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public login(data:any) {
        return this.http.post<any>(this.url+'/login',data)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user.success) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('opsUser', JSON.stringify(user.success));
                    this.currentUserSubject.next(user.success);
                }
                return user.success;
            }));
    }

    public register(data:any) {
        return this.http.post<any>(this.url+'/register',data)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('opsUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                return user;
            }));
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('opsUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
    }
}
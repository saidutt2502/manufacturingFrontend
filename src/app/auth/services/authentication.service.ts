import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../users';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router,) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>('https://jsonplaceholder.typicode.com/posts', { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                   var data = {
                      id: '1',
                      username: 'aman',
                      firstName: 'Aman',
                      lastName: 'Sharma',
                      token: 'fake-jwt-token'
                  };
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
    }
}
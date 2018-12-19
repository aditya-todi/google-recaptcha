import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    let postBody = { username, password }
    return this.http.post<User>("http://localhost:8000/user/login", postBody).pipe(
      map(user => {
        return user
      }),
      catchError(this.handleError)
    )
  }

  signUp(name: string, username: string, password: string, author: boolean, admin: boolean): Observable<User> {
    let postBody = { name, username, password, author, admin }
    return this.http.post<User>("http://localhost:8000/user/signUp", postBody).pipe(
      map((user) => {
        return user
      }),
      catchError(this.handleError)
    )
  }

  getUser(token: string): Observable<User> {
    let headers = new HttpHeaders({
      'Authorisation': 'Bearer' + ' ' + token
    })
    return this.http.get<User>("http://localhost:8000/user", { headers }).pipe(
      map((user) => {
        return user
      }),
      catchError(this.handleError)
    )
  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

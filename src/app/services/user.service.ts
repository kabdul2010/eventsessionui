import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiServer = "http://localhost:8080/user";
  private forgotServer = "http://localhost:8080/password"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'responseType': 'text' as 'json'
  }
  constructor(private httpClient: HttpClient,
    private router: Router) {
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiServer + '/saveUser', user, this.httpOptions)
  }

  forgotPassword(email: String): Observable<String> {
    console.log("in forgotpassword")
    return this.httpClient.post<any>(this.forgotServer + "/forgot/" + email, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  passwordChange(token: any, password: any): Observable<String> {
    console.log(token + "\t" + password);
    let params = new HttpParams();
    params = params.append('token', token)
    params = params.append('password', password)
    console.log({ params: params });
    return this.httpClient.post<any>(this.forgotServer + "/reset", { token, password }, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error)
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
    }
    return throwError(error.error.message);
  };
}

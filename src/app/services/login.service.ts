import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:8080/user"

  constructor(private http: HttpClient) { }

  generateToken(credentials: any) {
    return this.http.post(`${this.url}/loginUser`, credentials)
  }

  loginUser(token: string, refreshToken: string) {
    localStorage.setItem("token", token)
    localStorage.setItem("refreshToken", refreshToken)
    return true;
  }

  isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token == '' || token == null) {
      return false;
    }
    else {
      return true;
    }
  }


  getLoggedUser() {
    let token = localStorage.getItem("token");
    if(null!=token){
    let data1= JSON.parse(atob(token.split(".")[1]));
    return 'Weclome '+data1['sub'];
    }
    return "";
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    localStorage.clear();
    return true;
  }

  getToken() {
    return localStorage.getItem("token")
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   server_address :string ='http://localhost:5000/api';
  // server_address :string ='http://65.1.1.32:5000/api';
  //fasfsafsfsa


  constructor(private http: HttpClient) { }


  loginUser(user: any) {
    return this.http.post<any>(`${this.server_address}/login`, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getUser() {
    console.log(localStorage.getItem('user'))
    return localStorage.getItem('user')
  }

  changePassword(pass: any) {

    return this.http.post(`${this.server_address}/login/change-pass`, pass);

  }
}

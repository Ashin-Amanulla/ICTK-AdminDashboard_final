import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor(private _auth: AuthService,
    private _router: Router,
    private fb: FormBuilder,
    private http: HttpClient) { }

  signinForm = this.fb.group(

    {
      email: ['', Validators.required],
      password: ['', Validators.required]
    }
  )

  ngOnInit() {

 

  }

  loginUser() {
    this._auth.loginUser(this.user)
      .subscribe(
        response => {
          let result = response;
          if (result.status) {
            localStorage.setItem('token', response.token)
            localStorage.setItem('user1', JSON.stringify(response.user))
            this._router.navigate(['/pages']);
          } else {
            Swal.fire(
              'Warning!!',
              'User not found!',
              'error')
              .then (
                refresh =>{
                  window.location.reload();
              }) 
          }
        })




      }

}

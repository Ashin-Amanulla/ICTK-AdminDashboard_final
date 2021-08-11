import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  pass = {
    oldpassword: '',
    newpassword: '',
    email: ''

  }

  constructor(private _auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient) { }
    
 
  

  ngOnInit(): void {
  }

changePass(){

  Swal.fire({
    title: "Are you sure?",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Yes, Change it!",
    denyButtonText: "No, cancel please!",
    showDenyButton: true,
    text: "You won't be able to revert this!",
    icon: 'warning',
    cancelButtonColor: '#d33',

  }).then((result) => {
    if (result.isConfirmed) {
      this._auth.changePassword(this.pass)
        .subscribe(
          response => {
            if (response) {
              Swal.fire("Sucessfully Updated", "success")
                .then(() => {
                  this.router.navigate(['']);
                })
            }
            else {
              Swal.fire("Network Error", "Please do after sometime ", "error")
                .then(() => {
                  this.router.navigate(['']);
                })


            }
          }

        )

    } else {
      Swal.fire("Cancelled", "Your  file is safe ", "error");
    }

  })
}
}


import { Component, OnInit,enableProdMode } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { StaffService } from '../staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'ngx-add-admin-user',
  templateUrl: './add-admin-user.component.html',
  styleUrls: ['./add-admin-user.component.scss']
})
export class AddAdminUserComponent implements OnInit {
  
  adminUser = {
    username       : '',
    password       : '',
    firstname      : '',
    lastname       : '',
    email          : '',
    superadmin     : false,
    add            : true,
    edit           : true,
    delete         : true
  }

  submitted : boolean=false;
  constructor(private staffService:StaffService, private router:Router ,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.submitted = false;
  }

  closeForm(){
    this.router.navigate(['../AdminUsers'], { relativeTo: this.route });    
  }

  addAdminUser(){
    this.staffService.newAdminUser( this.adminUser).subscribe(
      response => {
        if (response) {
          Swal.fire("Successfully Added", "success")
          .then(() => {
            this.router.navigate(['../AdminUsers'], { relativeTo: this.route });
          })          }
        else {
          Swal.fire("Network Error", "Please do after sometime ", "error")
            .then(() => {
              this.router.navigate(['../AdminUsers'], { relativeTo: this.route });
            })

        }
      })
  }  
}

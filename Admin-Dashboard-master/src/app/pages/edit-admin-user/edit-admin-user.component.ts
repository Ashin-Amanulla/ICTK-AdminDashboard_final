import { Component, OnInit } from '@angular/core';
import { StaffService } from '../staff.service';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { ActivatedRoute,Router } from '@angular/router';
import '../ckeditor.loader';
import 'ckeditor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-edit-admin-user',
  templateUrl: './edit-admin-user.component.html',
  styleUrls: ['./edit-admin-user.component.scss']
})
export class EditAdminUserComponent implements OnInit {
  adminUser : any;
  submitted = false;
  constructor(private staffServiceobj:StaffService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.submitted = false;
    let AdminId = localStorage.getItem("adminEditAdminID");
    this.staffServiceobj.getAdminUser(AdminId)
    .subscribe((data)=>{
      this.adminUser =data; 
      });
  }
  closeForm(){
    this.router.navigate(['../AdminUsers'], { relativeTo: this.route });    
  }

  editUser() 
  {

    console.log("hi")
    this.staffServiceobj.editAdminUser(this.adminUser)      
    .subscribe(
      response => {
        if (response) {
          Swal.fire("Successfully Updated", "", "success") 
            .then(() => {
              this.router.navigate(['../AdminUsers'], { relativeTo: this.route });
            })
        }
        else {
          Swal.fire("Network Error", "Please do after sometime ", "error")
            .then(() => {
              this.router.navigate(['../AdminUsers'], { relativeTo: this.route });
            })

        }
      });    
    }
}

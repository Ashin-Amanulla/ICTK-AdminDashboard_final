import { Component, OnInit } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { NbWindowService } from '@nebular/theme';
import { ViewCourseComponent } from '../view-course/view-course.component';
import { DeleteCourseComponent } from '../delete-course/delete-course.component';
import { ActivatedRoute,Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StaffService } from '../staff.service';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder,  NbCheckboxComponent  } from '@nebular/theme';


@Component({
  selector: 'ngx-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit { 

  index:any;
  AdminUsers:any;
  srchName='';
  srchEmail='';
  public searchEmail: any = '';
  public searchStaffDesignation : any ='';
  

  // staffs=[{
  //   name:"",
  //   designation:"",
  //   about:"",
  //   image:"",
  //   index:0
  // }]

  constructor(private windowService:NbWindowService, private staffService:StaffService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.staffService.getAdminUsers()
    .subscribe((users)=>{
      this.AdminUsers = users;
    });
  }



  resetSearch(){
    this.srchName='';
    this.srchEmail='';
  }

  addAdmin() {
    this.router.navigate(['../AddAdminUser'], { relativeTo: this.route });
  }

  editAdmin(staff : any) {
    localStorage.setItem("adminEditAdminID", staff._id.toString());    
    this.router.navigate(['../EditAdminUser'], { relativeTo: this.route });
  }

  viewAdmin(staff:any){
    localStorage.setItem("adminViewAdminID", staff._id.toString());
    this.router.navigate(['../ViewAdminUser'], { relativeTo: this.route });

  }

 

  deleteAdmin(user){
    Swal.fire({
      title: `Are you sure, you want to delete the admin user ${user.Username}?`,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete it!",
      denyButtonText: "No, cancel please!",
      showDenyButton: true,
      text: "You won't be able to revert this!",
      icon: 'warning',
      cancelButtonColor: '#d33',

    }).then((result) => {
      if (result.isConfirmed) {
        this.staffService.deleteAdmin(user)
          .subscribe(
            response => {
              if (response) {
                Swal.fire("Sucessfully Deleted", "success")
                  .then(() => {
                    let currentUrl = this.router.url;
                    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                    this.router.navigate([currentUrl]);
                    });
                  })
              }
              else {
                Swal.fire("Network Error", "Please do after sometime ", "error")
                  .then(() => {
                    this.router.navigate(['../staffs']);
                  })


              }
            }

          )

      }
      else {
        Swal.fire("Cancelled", "Your  Staff record is safe ", "error");
      }

    })

  }

  ////
}

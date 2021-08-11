import { Component, OnInit } from '@angular/core';

import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { NbWindowService } from '@nebular/theme';
import { ViewCourseComponent } from '../view-course/view-course.component';

import { ActivatedRoute,Router } from '@angular/router';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder,  NbCheckboxComponent  } from '@nebular/theme';
import { StaffService } from '../staff.service';


import Swal from 'sweetalert2';



@Component({
  selector: 'ngx-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss']
})
export class StaffsComponent implements OnInit {

  index:any;
  staffs:any;
  srchName='';
  srchDesignation='';
  public searchStaffName: any = '';
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
    this.staffService.getstaffs().subscribe((data)=>{
      this.staffs=JSON.parse(JSON.stringify(data));
    })
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.staffs, event.previousIndex, event.currentIndex);
  }

  resetSearch(){
    this.srchName='';
    this.srchDesignation='';
  }

  addStaff() {
    this.router.navigate(['../addstaff'], { relativeTo: this.route });
  }

  editStaff(staff : any) {
    localStorage.setItem("adminEditStaffID", staff._id.toString());    
    this.router.navigate(['../editstaff'], { relativeTo: this.route });
  }

  viewStaff(staff:any){
    localStorage.setItem("adminEditStaffID", staff._id.toString());

    this.router.navigate(['../viewstaff'], { relativeTo: this.route });

  }

  editAccess(){
    var retrievedObject = localStorage.getItem('user1');
    var user1 = JSON.parse(retrievedObject);
  
    return !user1.edit;
    
  }

  deleteAccess(){
    var retrievedObject = localStorage.getItem('user1');
    var user1 = JSON.parse(retrievedObject);
 
    return !user1.delete;
  }

  addAccess(){
    var retrievedObject = localStorage.getItem('user1');
    var user1 = JSON.parse(retrievedObject);
 
    return !user1.add;
  }


  saveCourseIndex(){
    console.log(this.staffs);
    for(let i= 0; i<this.staffs.length; i++){
    this.staffs[i].index=i;  
    this.staffService.updateStaffIndex(this.staffs[i])
    .subscribe((staff)=>{
      console.log(staff);
    });
  }
 }

 resetCourseIndex(){
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
 }

  deleteStaff(staff){
    // console.log('inside delete')
    // localStorage.setItem("adminDeleteStaffID", staff._id.toString());
    // this.windowService.open(DeleteStaffComponent,{ title: `delete Staff` });
    
    Swal.fire({
      title: "Are you sure?",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete it!",
      denyButtonText: "No, cancel please!",
      showDenyButton: true,
      text: "You won't be able to revert this!",
      icon: 'warning',
      cancelButtonColor: '#d33',

    }).then((result) => {
      if (result.isConfirmed) {
        this.staffService.deletestaff(staff)
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
  
  



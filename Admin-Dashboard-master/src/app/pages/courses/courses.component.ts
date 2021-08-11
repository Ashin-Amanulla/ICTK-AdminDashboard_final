import { Component, OnInit } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { NbWindowService } from '@nebular/theme';
import { ViewCourseComponent } from '../view-course/view-course.component';
import { DeleteCourseComponent } from '../delete-course/delete-course.component';
import { CoursesService } from '../courses.service';
import { ActivatedRoute,Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder,  NbCheckboxComponent  } from '@nebular/theme';


@Component({
  selector: 'ngx-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public searchCourseTitle: any = '';
  public searchCourseCategory : any ='';
  srchTitle ='';
  srchCategory ='';
  Courses : any;
  CoursesActual: any;
  constructor(private windowService: NbWindowService, public courseObj : CoursesService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.courseObj.getCourses()
    .subscribe((courses)=>{
      this.Courses = courses;
      this.CoursesActual =  courses;
    });
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.Courses, event.previousIndex, event.currentIndex);
  }

  resetSearch(){
    this.srchTitle='';
    this.srchCategory='';
  }

  viewCourse(course : any) {
     localStorage.setItem("adminViewCourseID", course._id.toString());
    this.router.navigate(['../viewcourse'], { relativeTo: this.route });

  }
  editCourse(course : any) {
    localStorage.setItem("adminEditCourseID", course._id.toString());
    this.router.navigate(['../editcourse'], { relativeTo: this.route });
  }
  
  addCourse() {
    this.router.navigate(['../addcourse'], { relativeTo: this.route });
  }
  

  deleteCourse(course : any) {   
   Swal.fire({
    title: `Are you sure to delete the course ${course.course_title}?`,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Yes, Delete it!",
    denyButtonText: "No, Cancel please!",
    showDenyButton: true,
    text: "You won't be able to revert this!",
    icon: 'warning',
    cancelButtonColor: '#d33',

  }).then((result) => {
    if (result.isConfirmed) {
      this.courseObj.deleteCourse(course)
        .subscribe(
          response => {
            if (response) {
              Swal.fire("Successfully Deleted","","success")
              .then(()=>{
                let currentUrl = this.router.url;
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                    this.router.navigate([currentUrl]);
                });
              })
            }
            else {
              Swal.fire("Network Error", "Please do after sometime ", "error")
              .then(()=>{
                this.router.navigate(['../courses'], { relativeTo: this.route });
              })

            }
          }

        )

    } else {
      Swal.fire("Cancelled", "Your course record is safe ", "error");
    }

  })
}

  
  saveCourseIndex(){
    for(let i= 0; i<this.Courses.length; i++){
    this.Courses[i].index=i;  
    this.courseObj.updateCourseIndex(this.Courses[i])
    .subscribe((course)=>{
      // console.log(course);
    });
  }
 }

 resetCourseIndex(){
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
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

}



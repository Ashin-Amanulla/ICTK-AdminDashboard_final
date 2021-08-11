import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CoursesService } from '../courses.service';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.scss']
})
export class DeleteCourseComponent implements OnInit {
  course : any;
  course_Name ='';
  constructor(private  windowRef: NbWindowRef,public courseObj : CoursesService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let CourseId = localStorage.getItem("adminDeleteCourseID");
    
    this.courseObj.getCourse(CourseId)
    .subscribe((courseItem)=>{
      this.course =courseItem;
      this.course_Name =this.course.course_title;
      });
  }
  closeForm(){
    this.windowRef.close();
  }

  deleteC(course : any){
    let parentRoute= localStorage.getItem("CourseParentRoute");
    this.courseObj.deleteCourse(course)    
    .subscribe(data =>{console.log(data)});
    window.opener.location.reload();
    
    };
    
  }


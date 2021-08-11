import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { ActivatedRoute,Router } from '@angular/router';
import '../ckeditor.loader';
import 'ckeditor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@Component({
  selector: 'ngx-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {
  course : any;
  constructor(public courseObj : CoursesService, private router:Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    let CourseId = localStorage.getItem("adminViewCourseID");
    this.courseObj.getCourse(CourseId)
    .subscribe((courseItem)=>{
      this.course =courseItem;
      console.log(this.course);
      });
  }
   closeForm(){
    this.router.navigate(['../courses'], { relativeTo: this.route });
  }
}

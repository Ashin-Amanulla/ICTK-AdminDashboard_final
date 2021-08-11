import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import '../ckeditor.loader';
import 'ckeditor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'ngx-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  course ={
    course_title            : '',
    course_image            : '',
    course_short_desc       : '',
    Reg_Status              : 1,
    Category                : '',
    Rating                  : 1,
    about_course            : '',
    dates                   : '' ,
    eligibility             : '',
    course_fee              : '',
    entrance_details        : '',
    refund_policy           : '',
    course_delivery         : '',
    internship_partner      : '',
    knowledge_partner       : '',
    sponser_partner         : '',
    index                   : 0,
    active                  : true 
  }

  downloadURL: Observable<string>
  fb: any;
  ifActive: boolean = false;
  ifActive4: boolean = false;

  submitted: boolean = false;
  imageModified: boolean = false;
  imgPrev: any = '';

  constructor(public courseObj: CoursesService, private router: Router, private route: ActivatedRoute, private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.submitted = false;
    let CourseId = localStorage.getItem("adminEditCourseID");
    this.imageModified = false;
    this.courseObj.getCourse(CourseId)
      .subscribe((data) => {
        this.course = JSON.parse(JSON.stringify(data));
      });
      this.ifActive = true;
      this.ifActive4 = true;

  }

  closeForm() {
    this.router.navigate(['../courses'], { relativeTo: this.route });
  }

  editCourse() {

    this.courseObj.editCourse(this.course)
      .subscribe(
        response => {
          if (response) {
            Swal.fire("Successfully Updated", "", "success")
              .then(() => {
                this.router.navigate(['../courses'], { relativeTo: this.route });
              })
          }
          else {
            Swal.fire("Network Error", "Please do after sometime ", "error")
              .then(() => {
                this.router.navigate(['../courses'], { relativeTo: this.route });
              })

          }
        });
  }



  selectImage(event: any) {

    this.ifActive = false;
    const file = event.target.files[0];
    var n = new Date();
    const filePath = `uploads/${n}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(`uploads/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.course.course_delivery = url;
              this.ifActive = true;
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('hhhh',url);
        }
      });
  }

   selectImage1(event: any) {
    const file = event.target.files[0];
    var n = new Date();
    const filePath = `uploads/${n}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(`uploads/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.course.knowledge_partner = url;
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('hhhh',url);
        }
      });
  }

  selectImage2(event: any) {
    const file = event.target.files[0];
    var n = new Date();
    const filePath = `uploads/${n}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(`uploads/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.course.internship_partner = url;
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('hhhh',url);
        }
      });
  }

  selectImage3(event: any) {
    const file = event.target.files[0];
    var n = new Date();
    const filePath = `uploads/${n}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(`uploads/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.course.sponser_partner = url;
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('hhhh',url);
        }
      });
  }

  selectImage4(event: any) {
    this.ifActive = false;
    const file = event.target.files[0];
    var n = new Date();
    const filePath = `courses/${n}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(`courses/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.course.course_image = url;
              this.ifActive4 = true;
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('hhhh',url);
        }
      });
  }


}


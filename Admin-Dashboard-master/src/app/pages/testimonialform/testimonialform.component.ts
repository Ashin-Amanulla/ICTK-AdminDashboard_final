import { Component, OnInit } from '@angular/core';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { TestService } from '../test.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'ngx-testimonialform',
  templateUrl: './testimonialform.component.html',
  styleUrls: ['./testimonialform.component.scss']
})
export class TestimonialformComponent implements OnInit {

  submitted = false;
  ifActive: boolean = false;
  downloadURL: Observable<string>
  fb: any;


  testimonialDetails = {
    name: "",
    position: "",
    organisation: "",
    testimony: "",
    course_title: "",
    image: ""

  }

  constructor(private testService: TestService, private router: Router, private route: ActivatedRoute,private fireStorage: AngularFireStorage) { }
  
  ngOnInit(): void {
    this.submitted = false;
    this.ifActive = false;
  }



  addTestimonial() {

    this.testService.newTestimonial( this.testimonialDetails).subscribe(
      response => {
        console.log(response);
        if (response) {
          Swal.fire("Successfully Added", "success")
            .then(() => {
              this.router.navigate(['../testimonials'], { relativeTo: this.route });
            })
        }
        else {
          Swal.fire("Network Error", "Please do after sometime ", "error")
            .then(() => {
              this.router.navigate(['../testimonials'], { relativeTo: this.route });
            })

        }
      })
  }


  selectImage(event: any) {
    this.ifActive = false;
    const file = event.target.files[0];
    var n = new Date();
    const filePath = `testimonials/${n}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(`testimonials/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          console.log('inside snapshot');
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.testimonialDetails.image = url;
              this.ifActive = true;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('hhhh', url);
        }
      });
  }








  deleteTestimonial(testimonial: any) { }

  editTestimonial(testimonial: any) { }



  closeForm() {
    this.router.navigate(['../testimonials'], { relativeTo: this.route });
  }


}

import { Component, OnInit } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { NbWindowService } from '@nebular/theme';
import { TestimonialformComponent } from '../testimonialform/testimonialform.component';
import { TestService } from '../test.service';
import Swal from 'sweetalert2';


import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  testimonials: any;

  constructor(private windowService: NbWindowService, private testService: TestService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.testService.gettestimonials().subscribe((data) => {
      console.log(data);
      this.testimonials = data;
    })
  }
  addTestimonial() {
    this.router.navigate(['../addtestimonial'], { relativeTo: this.route });
  }
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.testimonials, event.previousIndex, event.currentIndex);

  }

  viewTestimonial(testimonial: any) {
    localStorage.setItem("adminViewTestimonialID", testimonial._id.toString());
    this.router.navigate(['../viewtestimonial'], { relativeTo: this.route });
  }

  deleteTestimonial(course: any) {
    Swal.fire({
      title: `Are you sure to delete the Testimonial?`,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete it!",
      denyButtonText: "No, Cancel please!", 
      showDenyButton: true,
      text: "You won't be able to revert this!",
      icon: 'warning',
      cancelButtonColor: '#d33',

    }).then((result) => {
      if (result.isConfirmed) {
        this.testService.deletetestimonial(course)
          .subscribe(
            response => {
              console.log(response, 'check');
              if (response) {
                Swal.fire("Successfully Deleted", "", "success")
                  .then(() => {
                    let currentUrl = this.router.url;
                    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                      this.router.navigate([currentUrl]);
                    });
                  })
              }
              else {
                Swal.fire("Network Error", "Please do after sometime ", "error")
                  .then(() => {
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

  editTestimonial(testimonial: any) {
    localStorage.setItem("adminEditTestimonialID", testimonial._id.toString());
    this.router.navigate(['../edittestimonial'], { relativeTo: this.route });
  }
  saveTestimonialsIndex() {
    console.log(this.testimonials);
    for (let i = 0; i < this.testimonials.length; i++) {
      this.testimonials[i].index = i;
      this.testService.updateTestimonialIndex(this.testimonials[i])
        .subscribe((testimonials) => {
          console.log(testimonials);
        });
    }
  }

  resetTestimonialsIndex() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
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
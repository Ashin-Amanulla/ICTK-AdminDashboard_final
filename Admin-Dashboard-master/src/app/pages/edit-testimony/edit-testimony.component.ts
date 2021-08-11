import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from '../test.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'ngx-edit-testimony',
  templateUrl: './edit-testimony.component.html',
  styleUrls: ['./edit-testimony.component.scss']
})
export class EditTestimonyComponent implements OnInit {

  submitted : boolean = false;
  imageModified : boolean=false;
  imgPrev  : any ='';
  downloadURL: Observable<string>
  fb: any;
  ifActive: boolean ;

  testimonialItem={
    name:"",
    position:"",
    organisation:"",
    testimony:"",
    course_title:"",
    image:""
  }

  constructor(private testService:TestService, private router:Router, private route: ActivatedRoute, private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.submitted = false;
    this.imageModified=false;
    let testimonialId = localStorage.getItem("adminEditTestimonialID");
    this.testService.gettestimonial(testimonialId).subscribe((data)=>{
    console.log(data);
    this.testimonialItem=JSON.parse(JSON.stringify(data));
    this.imgPrev    = this.testimonialItem.image;
    this.ifActive = true;
  })
  }

  
  editTestimonial()  {

      this.testService.editTestimonial( this.testimonialItem)
      .subscribe(
        response => {
          if (response) {
            Swal.fire("Successfully Updated", "", "success")
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
        });
    }



  updateImage(event : any) { 
    
    this.ifActive = false;
    const file = event.target.files[0];
    console.log(file);
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
              this.testimonialItem.image = url;
              this.ifActive = true;
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('hhhh', url);
        }
      });
  }

  closeForm(){
    this.router.navigate(['../testimonials'], { relativeTo: this.route });    
  }
}

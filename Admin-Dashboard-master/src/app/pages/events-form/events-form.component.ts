import { Component, OnInit } from '@angular/core';
import '../ckeditor.loader';
import 'ckeditor';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import Swal from 'sweetalert2';


@Component({
  selector: 'ngx-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.scss']
})


export class EventsFormComponent implements OnInit {

  downloadURL: Observable<string>
  fb: any;
  ifActive: boolean = false;
  submitted: boolean = false;

  eventDetails={
    name:"",
    shortdetails:"",
    moredetails:"",
    boxdetails:"",
    coordinatorsdetail:"",
    registrationlink:"",
    date:"",
    image:""
  }

  constructor(private router:Router, private route:ActivatedRoute, private eventService :EventService, private fireStorage: AngularFireStorage) { }

  

  ngOnInit(): void {
    this.submitted = false;
    this.ifActive = false;
  }

  addevent(){

    this.eventService.newEvent( this.eventDetails).subscribe(
      response => {
        console.log(response);
        if (response) {
          Swal.fire("Successfully Added", "success")
            .then(() => {
              this.router.navigate(['../events'], { relativeTo: this.route });
            })
        }
        else {
          Swal.fire("Network Error", "Please do after sometime ", "error")
            .then(() => {
              this.router.navigate(['../events'], { relativeTo: this.route });
            })

        }
      })

  }

  selectImage(event: any) {
    this.ifActive = false;
    const file = event.target.files[0];
    console.log(file);
    var n = new Date();
    const filePath = `events/${n}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(`events/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          console.log('inside snapshot');
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.eventDetails.image = url;
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

}

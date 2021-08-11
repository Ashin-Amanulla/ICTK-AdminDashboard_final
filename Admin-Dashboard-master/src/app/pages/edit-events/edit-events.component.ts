import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'ngx-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.scss']
})
export class EditEventsComponent implements OnInit {

  submitted: boolean = false;
  imageModified: boolean = false;
  imgPrev: any = '';
  downloadURL: Observable<string>
  fb: any;
  ifActive: boolean;



  eventItem = {
    name: "",
    shortdetails: "",
    moredetails: "",
    boxdetails: "",
    coordinatorsdetail: "",
    registrationlink: "",
    brouchurelink: "",
    programschedule: "",
    speakerslist: "",
    button: "",
    date: "",
    image: ""
  }

  constructor(private router: Router, private eventService: EventService, private route: ActivatedRoute, private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.submitted = false;
    this.imageModified = false;
    let eventId = localStorage.getItem("adminEditEventID");
    this.eventService.getevent(eventId).subscribe((data) => {
      this.eventItem = JSON.parse(JSON.stringify(data));
      this.imgPrev = this.eventItem.image;
      this.ifActive = true;

    })
  }
  editevent() {

    this.eventService.editEvent(this.eventItem)
      .subscribe(
        response => {
          if (response) {
            Swal.fire("Successfully Updated", "", "success")
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
        });
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
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.eventItem.image = url;
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

  closeForm() {
    this.router.navigate(['../events'], { relativeTo: this.route });
  }


}
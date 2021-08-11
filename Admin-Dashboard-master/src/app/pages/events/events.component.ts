import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { EventService } from '../event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events:any;

  constructor(private router:Router, private route:ActivatedRoute, private eventService:EventService) { }

  ngOnInit(): void {
    this.eventService.getevents().subscribe((data)=>{
      this.events=JSON.parse(JSON.stringify(data));
    })
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.events, event.previousIndex, event.currentIndex);
  }

  addevents(){
    this.router.navigate(['../addevents'], { relativeTo: this.route });
  }

  editEvent(event : any) {
    
    localStorage.setItem("adminEditEventID", event._id.toString());
    
    this.router.navigate(['../editevent'], { relativeTo: this.route });
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


  saveEventIndex(){
    console.log(this.events);
    for(let i= 0; i<this.events.length; i++){
    this.events[i].index=i;  
    this.eventService.updateEventIndex(this.events[i])
    .subscribe((staff)=>{
      console.log(staff);
    });
  }
 }

  resetEventIndex(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
   }

  deleteEvent(event){
    
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
        this.eventService.deleteevent(event)
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
                    this.router.navigate(['../events']);
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

  viewEvent(event : any){
    localStorage.setItem("adminEditEventID", event._id.toString());

    this.router.navigate(['../viewevent'], { relativeTo: this.route });

  }


}

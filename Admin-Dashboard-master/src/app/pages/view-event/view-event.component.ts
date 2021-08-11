import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'ngx-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {

  eventItem:any;
  imgPrev:any;

  constructor(private router:Router,private eventService:EventService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let eventId = localStorage.getItem("adminEditEventID");
    this.eventService.getevent(eventId).subscribe((data)=>{
    console.log(data);
    this.eventItem=JSON.parse(JSON.stringify(data));
    this.imgPrev    = this.eventItem.image;
  })

  }

  closeForm(){
    this.router.navigate(['../events'], { relativeTo: this.route });
  }

}

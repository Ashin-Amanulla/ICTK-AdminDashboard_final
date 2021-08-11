import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'ngx-view-testimony',
  templateUrl: './view-testimony.component.html',
  styleUrls: ['./view-testimony.component.scss']
})
export class ViewTestimonyComponent implements OnInit {

  testimonialItem:any; 
  imgPrev:any;
  name:any;
  position:any;
  organisation:any;
  testimonial:any;
  course_title:any; 

  constructor(private testService:TestService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let testimonialId = localStorage.getItem("adminViewTestimonialID");
    console.log(testimonialId);
    this.testService.gettestimonial(testimonialId).subscribe((data)=>{
    console.log(data);
    this.testimonialItem=data;
    this.imgPrev    = this.testimonialItem.image;
    this.name =this.testimonialItem.name;
    this.position =this.testimonialItem.position;
    this.organisation =this.testimonialItem.organisation;
    this.course_title =this.testimonialItem.course_title;  
    this.testimonial =this.testimonialItem.testimonial;
  })
  }

  closeForm(){
    this.router.navigate(['../testimonials'], { relativeTo: this.route });    
  }
}

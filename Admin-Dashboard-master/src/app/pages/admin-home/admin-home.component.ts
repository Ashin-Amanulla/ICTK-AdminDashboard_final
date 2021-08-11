import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CoursesService } from '../courses.service';
import { ActivatedRoute,Router } from '@angular/router';
import { OfferingsService } from '../offerings.service';
import { StaffService } from '../staff.service';
import { TestService } from '../test.service';

@Component({
  selector: 'ngx-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  single: any[];
  multi: any[];
  registeredUsersAgg : any;  
  partnerApplns : any;
  corporateApplns : any;
  Courses : any;
  staffs:any;
  testimonials : any;

  view: any[] = [700, 400];

  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  trimLabels : boolean = false;
  legendPosition: string = 'Right';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  courseRegistrnData : any[]=[];



  showLegendCourse: boolean = true;
  showLabelsCourse: boolean = true;
  tooltipDisabledCourse : boolean =false;

  colorSchemeCourse = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  OfferingData : any[]=[];

  colorSchemeTotal = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#232837';

  totalData : any[]=[];
  // totalData= [
  //   {name : 'Courses', value: 5},
  //   {name : 'Admin Users', value: 20},
  //   {name : 'Staffs', value: 100},
  //   {name : 'Testimonials', value: 120},
  // ]
  
  constructor(public courseObj : CoursesService,private testService:TestService, private router:Router, private route: ActivatedRoute, private offeringObj : OfferingsService, private staffService:StaffService) { 
    let objoffering : any[]=[];
    let objTotal : any[]=[];
    this.courseRegistrnData=[];
    this.OfferingData =[];
    this.totalData=[];
    this.courseObj.getCourseRegistrationAggr()
    .subscribe((users)=>{
      this.registeredUsersAgg = JSON.parse(JSON.stringify(users));
      let obj;
      let obj2: any[] =[];
      for(let i=0; i< this.registeredUsersAgg.length; i++)
      {
        obj = {
          name: this.registeredUsersAgg[i]._id.course_title,
          value: this.registeredUsersAgg[i].totalCourseRegstrn
        }
        obj2.push(obj)
      }  
     this.courseRegistrnData=obj2;
    });
    this.offeringObj.getOfferings()
    .subscribe((applns)=>{
      this.partnerApplns   = applns;
      let partnervalue=this.partnerApplns.length;
      let obj1= {
        name: 'Partner Applications', 
        value: partnervalue
      };
      objoffering.push(obj1);
    });
    this.offeringObj.getCoperateApplns()
    .subscribe((applns)=>{
      this.corporateApplns   = applns;
      let corporatevalue= this.corporateApplns.length;
      let obj1= {
        name: 'Corporate Applications', 
        value: corporatevalue
      };
      objoffering.push(obj1);
      this.OfferingData=objoffering;
    });

    this.courseObj.getCourses()
    .subscribe((courses)=>{
      this.Courses = courses;
      let count= this.Courses.length;
      
      let obj1= {
        name: 'Courses', 
        value: count
      };
      objTotal.push(obj1);
    });

    this.testService.gettestimonials().subscribe((data)=>{
    this.testimonials=data;
    let count= this.testimonials.length;
    let obj1= {
      name: 'Testimonials', 
      value: count
    }; 
    objTotal.push(obj1);
  })

  this.staffService.getstaffs().subscribe((data)=>{
    this.staffs=data;
    let count= this.staffs.length;
    
    let obj1= {
      name: 'Staffs', 
      value: count
    };
    objTotal.push(obj1);
    this.totalData=objTotal;
  })
  }



  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event);
  }
  
}

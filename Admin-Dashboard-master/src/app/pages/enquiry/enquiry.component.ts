import { Component, OnInit } from '@angular/core';
import { OfferingsService } from '../offerings.service';
import { ActivatedRoute,Router } from '@angular/router';
import { NbDateService } from '@nebular/theme';
import * as XLSX from 'xlsx'; 
import Swal from 'sweetalert2';


@Component({
  selector: 'ngx-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {
  public searchStaffName: any = '';
  Enquires : any;
  actualArray : any;
  dateFilteredArray: any=[];
  toDate : any;
  fromDate : any;
  srchName ='';
  formattedDate : any;

  constructor(private offeringObj : OfferingsService, private router : Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.offeringObj.getEnquires()
    .subscribe((enqry)=>{
      this.Enquires        = enqry;
      this.actualArray     = enqry;
      console.log(this.Enquires);
    });    
  }
  resetSearch(){
    this.srchName='';
    this.toDate='';
    this.fromDate='';
    this.Enquires  = this.actualArray;
  }


  filterArray(event:any)
  {
    // this.dateFilteredArray =[];
    this.dateFilteredArray =[];
    if ((!this.fromDate)||(!this.toDate))
    {
      return;
    }
   let fromdt=Date.parse(this.fromDate);
   console.log(fromdt);
   let todt=Date.parse(this.toDate);
   console.log(todt);
   if(fromdt>todt){
     Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `The To Date is a date before From DateSomething went wrong!!!The To Date is set to today's date`
    })
     this.toDate=new Date();
   }
    
   let cDt;
   console.log(this.actualArray)
   for(let i=0; i<this.actualArray.length;i++)
   {
    cDt =Date.parse(this.actualArray[i].creation_date);
    console.log(cDt);
    if((cDt >= fromdt) && (cDt<= todt)) {
      this.dateFilteredArray.push(this.actualArray[i])
    }
   }
   this.Enquires = this.dateFilteredArray;
  }

  sendResponse(enquiry :any){
      console.log('butteon clicked');
      console.log(enquiry);
      localStorage.setItem("sendResponseID", enquiry._id.toString());
      this.router.navigate(['../SendResponse'], { relativeTo: this.route });
    }
}

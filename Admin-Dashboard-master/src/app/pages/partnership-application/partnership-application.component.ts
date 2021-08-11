import { Component, OnInit } from '@angular/core';
import { OfferingsService } from '../offerings.service';
import { ActivatedRoute,Router } from '@angular/router';
import { NbDateService } from '@nebular/theme';
import * as XLSX from 'xlsx'; 
import Swal from 'sweetalert2';
 
@Component({
  selector: 'ngx-partnership-application',
  templateUrl: './partnership-application.component.html',
  styleUrls: ['./partnership-application.component.scss']
})
export class PartnershipApplicationComponent implements OnInit {
  public searchStaffName: any = '';
  partnerApplns : any;
  actualArray : any;
  dateFilteredArray: any=[];
  toDate : any;
  fromDate : any;
  srchName ='';
  srchCategory ='';
  fileName= 'ExcelSheet.xlsx'; 
  formattedDate : any;

  constructor(private offeringObj : OfferingsService) { }
 
  ngOnInit(): void {
    this.offeringObj.getOfferings()
    .subscribe((applns)=>{
      this.partnerApplns   = applns;
      this.actualArray     = applns;
      console.log(this.partnerApplns);
    });
  }

  resetSearch(){
    this.srchName='';
    this.srchCategory='';
    this.toDate='';
    this.fromDate='';
    this.partnerApplns  = this.actualArray;
  }

  exportexcel(): void 
  {
     /* table id is passed over here */  
     this.formattedDate=new Date().toISOString().slice(0,19).replace('T', ' ');
     this.fileName= `PartnerApplications_${this.formattedDate}.xlsx`;
     let element = document.getElementById('excel-table'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);    
  }

  filterArray(event:any)
  {
    // this.dateFilteredArray =[];
    this.dateFilteredArray =[];
    if ((!this.fromDate)||(!this.toDate))
    {
      return;
    }
  //  if(!this.fromDate)
  //  {
  //     this.fromDate=new Date();
  //     this.fromDate.setMonth(this.fromDate.getMonth()-1) 
  //     console.log(this.fromDate);
  //  }
  //  if(!this.toDate)
  //  {
  //     this.toDate=new Date();
  //     console.log(this.toDate);
  //  }   
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
   this.partnerApplns = this.dateFilteredArray;
  }
}

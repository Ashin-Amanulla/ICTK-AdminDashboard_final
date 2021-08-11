import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { ActivatedRoute,Router } from '@angular/router';
import { NbDateService } from '@nebular/theme';
import * as XLSX from 'xlsx'; 
import Swal from 'sweetalert2';
@Component({
  selector: 'ngx-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  public searchCourseTitle: any = '';
  public searchCourseCategory : any ='';
  registeredUsers : any;
  actualArray : any;
  dateFilteredArray: any=[];
  toDate : any;
  fromDate : any;
  srchTitle ='';
  srchCategory ='';
  fileName= 'ExcelSheet.xlsx'; 
  formattedDate : any;


  constructor(public courseObj : CoursesService, private router:Router, private route: ActivatedRoute) {
 
   }

  ngOnInit(): void {
    this.courseObj.getCourseRegistrationList()
    .subscribe((users)=>{
      this.registeredUsers = users;
      this.actualArray     = users;
      console.log(this.registeredUsers);
    });
    // this.fromDate=new Date();
    // this.fromDate.setMonth(this.fromDate.getMonth()-1);
    // this.toDate= new Date(); 
  }



  resetSearch(){
    this.srchTitle='';
    this.srchCategory='';
    this.toDate='';
    this.fromDate='';
    this.registeredUsers  = this.actualArray;
  }

  exportexcel(): void 
  {
     /* table id is passed over here */  
     this.formattedDate=new Date().toISOString().slice(0,19).replace('T', ' ');
     this.fileName= `CourseRegistredUsers_${this.formattedDate}.xlsx`;
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
   this.registeredUsers = this.dateFilteredArray;
  }

}

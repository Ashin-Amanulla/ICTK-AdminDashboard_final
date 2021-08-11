import { Component, OnInit } from '@angular/core';
import { OfferingsService } from '../offerings.service';
import { ActivatedRoute,Router } from '@angular/router';
import { NbDateService } from '@nebular/theme';
import * as XLSX from 'xlsx'; 
import Swal from 'sweetalert2';
import { NbWindowService,NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-enquiry-response',
  templateUrl: './enquiry-response.component.html', 
  styleUrls: ['./enquiry-response.component.scss']
})
export class EnquiryResponseComponent implements OnInit {
  submitted = false;
  attachment :any= [];
  enquiryData   : any;
  imageModified : boolean=false;
  mail = {
    enquiry :'',
    to      :'', 
    subject : '', 
    text    : 'Text',
     _id    : '', 
     message : ''
  }
  constructor(private offeringObj : OfferingsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.imageModified=false;
    this.submitted = false;
    let enquiryId = localStorage.getItem("sendResponseID");
    console.log(enquiryId)
    this.offeringObj.getEnquiry(enquiryId)
    .subscribe((data)=>{
      this.enquiryData =data;
      this.mail._id=this.enquiryData._id;
      this.mail.to=this.enquiryData.email;
      this.mail.subject=this.enquiryData.subject;
      console.log(this.enquiryData);
      });

  }

  sendResponse(){
    if(!this.imageModified)  
    {
      this.offeringObj.sendemail(this.mail)
      .subscribe(
        response => {
          if (response) {
            Swal.fire("Mail Sent", "", "success")
              .then(() => {
                this.router.navigate(['../Enquires'], { relativeTo: this.route });
              })
          }
          else {
            Swal.fire("Network Error", "Please do after sometime ", "error")
              .then(() => {
                this.router.navigate(['../Enquires'], { relativeTo: this.route });
              })

          }
        });
    }
    else 
    {
      this.offeringObj.sendemailwithAttachment(this.attachment,this.mail)
      .subscribe(
        response => {
          if (response) {
            Swal.fire("Mail Sent", "", "success")
              .then(() => {
                this.router.navigate(['../Enquires'], { relativeTo: this.route });
              })
          }
          else {
            Swal.fire("Network Error", "Please do after sometime ", "error")
              .then(() => {
                this.router.navigate(['../Enquires'], { relativeTo: this.route });
              })

          }
        });    
    }
  }

  removeAttachment(id : any){
    this.attachment.splice(id,  1);
  }

  selectImage(event : any) {
    console.log('select image')
    this.imageModified=true;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.attachment.push(file);
      console.log('inside if event')
    }
  //   var output = [];
  //  for (var i = 0; i< this.attachment.Length ; i++) 
  //     {  
  //             output.push(`<li><strong>${this.attachment[i].name}</strong>`);
  //     }
  //     document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
      }


  closeForm(){
    this.router.navigate(['../Enquires'], { relativeTo: this.route });
  }

}

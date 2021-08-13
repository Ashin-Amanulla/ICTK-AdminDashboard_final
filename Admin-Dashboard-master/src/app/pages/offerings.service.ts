import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfferingsService {

  constructor(private http: HttpClient) { }

    server_address :string ='/api';
  // server_address :string ='http://localhost:5000';

  getOfferings() {
    return this.http.get(`${this.server_address}/application/partnershipapplicationList`)
  };

  getEnquires() {
    return this.http.get(`${this.server_address}/enquiryMenu/EnquiryList`)
  };

  getEnquiry(id: any) {
    return this.http.get(`${this.server_address}/enquiryMenu/enquiry/` + id);
  }


  sendemail(mail: any) {
    console.log('send mail');
    console.log(mail);
    return this.http.post(`${this.server_address}/enquiryMenu/Enquiry/sendmail`, mail);
  }

  getCoperateApplns(){
    return this.http.get(`${this.server_address}/application/CorporateapplicationList`)
  };
  
  sendemailwithAttachment(attachment: any, item: any) {

    console.log('inside service upload')
    const formData = new FormData();
    for (let i = 0; i < attachment.length; i++) {
      formData.append("attachments", attachment[i], attachment[i]['name']);
      console.log(`${i} ${attachment[i]}`);
    }
    formData.append('_id', item._id);
    formData.append('to', item.to);
    formData.append('subject', item.subject);
    formData.append('text', item.text);
    formData.append('message', item.message);


    return this.http.post(`${this.server_address}/enquiryMenu/Enquiry/sendmailWithAttachment`, formData)

  }
}

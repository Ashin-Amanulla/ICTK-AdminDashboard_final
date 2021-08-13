import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {


  constructor(private http: HttpClient) { }

  server_address :string ='/api';
  // server_address :string ='http://localhost:5000';

  gettestimonial(id: any) {
    return this.http.get(`${this.server_address}/testimonials/testimonial/` + id);
  }


  gettestimonials() {
    return this.http.get(`${this.server_address}/testimonials`);
  }

  updateTestimonialIndex(testimonial: any) {
    return this.http.put(`${this.server_address}/testimonials/Testimonials/updateIndex`, testimonial);
  };


  newTestimonial(item: any) {

    return this.http.post(`${this.server_address}/testimonials/testimony/insert`, item)
  }


  deletetestimonial(testimonial: any) {
    return this.http.post(`${this.server_address}/testimonials/testimonial/remove/`, testimonial);
  }


  editTestimonial(item: any) {
    return this.http.post(`${this.server_address}/testimonials/testimonial/update`, item)
  };


}



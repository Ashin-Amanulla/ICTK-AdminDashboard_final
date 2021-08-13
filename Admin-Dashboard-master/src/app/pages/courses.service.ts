import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(public http: HttpClient) { }

  server_address :string ='http://65.1.1.32:5000/api';
  // server_address :string ='http://localhost:5000';

  getCourses() {
    return this.http.get(`${this.server_address}/course/CourseList`)
  };

  getCourseRegistrationAggr() {
    return this.http.get(`${this.server_address}/registration/registercourseAggr`)
  };

  session_out() {
    this.http.get(`${this.server_address}/logout`)
  };

  getCourseRegistrationList() {
    return this.http.get(`${this.server_address}/registration/registercourseList`)
  };

  getCourse(id: any) {
    return this.http.get(`${this.server_address}/course/Course/` + id);
  };

  updateCourseIndex(course: any) {
    return this.http.put(`${this.server_address}/course/Course/updateIndex`, course);
  };

  editCourse(Course: any) {
    return this.http.post(`${this.server_address}/course/Course/update`, Course);
  };



  newCourse(course: any) {
    return this.http.post(`${this.server_address}/course/Course/insert`, course);
  }

  deleteCourse(Course: any) {
    return this.http.post(`${this.server_address}/course/Course/remove`, Course);
  }
}

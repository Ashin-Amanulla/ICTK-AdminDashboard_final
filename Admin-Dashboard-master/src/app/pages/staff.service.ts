import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient) { }

  // server_address :string ='http://65.1.1.32:5000/api';
  server_address :string ='http://localhost:5000/api';


  getstaff(id: any) {
    return this.http.get(`${this.server_address}/staffMenu/staff/` + id);
  }


  getstaffs() {
    return this.http.get(`${this.server_address}/staffMenu/staffs`);
  }

  updateStaffIndex(staff: any) {
    console.log(staff);
    return this.http.put(`${this.server_address}/staffMenu/Staffs/updateIndex`, staff);
  };


  newStaff( item: any) {

    console.log('inside service upload')
    return this.http.post(`${this.server_address}/staffMenu/Staff/insert`, item);
  }

  deletestaff(staff: any) {
    return this.http.post(`${this.server_address}/staffMenu/Staff/remove`, staff);
  }

  editStaff(item: any) {
    return this.http.post(`${this.server_address}/staffMenu/staff/update`, item)
  };


  newAdminUser(item:any){
    console.log(item);
    return this.http.post(`${this.server_address}/AdminUser/insert`,item);
  }

  deleteAdmin(item:any){
    return this.http.post(`${this.server_address}/AdminUser/remove`,item);
  }

  getAdminUsers(){
    return this.http.get(`${this.server_address}/AdminUser/AdminUserList`);
  }

  getAdminUser(id:any){
    return this.http.get(`${this.server_address}/AdminUser/AdminUserDetails/`+id);
  }
  editAdminUser(item:any) {
    return this.http.post(`${this.server_address}/AdminUser/update`,item)
  }




}

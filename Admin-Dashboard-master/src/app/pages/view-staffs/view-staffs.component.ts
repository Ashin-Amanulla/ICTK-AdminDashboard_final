import { Component, OnInit } from '@angular/core';
import { StaffService } from '../staff.service';

@Component({
  selector: 'ngx-view-staffs',
  templateUrl: './view-staffs.component.html',
  styleUrls: ['./view-staffs.component.scss']
})
export class ViewStaffsComponent implements OnInit {
   
  staffItem:any;
  imgPrev:any;
  name:any;
  designation:any;
  about:any;

  constructor(private staffServiceobj:StaffService) { }

  ngOnInit(): void {

    let staffId = localStorage.getItem("adminEditStaffID");
    this.staffServiceobj.getstaff(staffId).subscribe((data)=>{
    console.log(data);
    this.staffItem=JSON.parse(JSON.stringify(data));
    this.imgPrev    = this.staffItem.image;
    this.name =this.staffItem.name;
    this.designation =this.staffItem.designation;
    this.about =this.staffItem.about;

  })
}

}

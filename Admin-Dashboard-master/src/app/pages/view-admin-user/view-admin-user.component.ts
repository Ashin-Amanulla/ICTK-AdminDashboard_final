import { Component, OnInit } from '@angular/core';
import { StaffService } from '../staff.service';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { ActivatedRoute,Router } from '@angular/router';
import '../ckeditor.loader';
import 'ckeditor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-view-admin-user',
  templateUrl: './view-admin-user.component.html',
  styleUrls: ['./view-admin-user.component.scss']
})
export class ViewAdminUserComponent implements OnInit {
  adminUser : any;
  constructor(private staffServiceobj:StaffService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let AdminId = localStorage.getItem("adminViewAdminID");
    console.log(AdminId);
    this.staffServiceobj.getAdminUser(AdminId)
    .subscribe((data)=>{
      this.adminUser =data; 
      });
  }
  closeForm(){
    this.router.navigate(['../AdminUsers'], { relativeTo: this.route });
  }
}

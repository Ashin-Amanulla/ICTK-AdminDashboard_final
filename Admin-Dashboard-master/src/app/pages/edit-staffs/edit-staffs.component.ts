import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { StaffService } from '../staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'ngx-edit-staffs',
  templateUrl: './edit-staffs.component.html',
  styleUrls: ['./edit-staffs.component.scss']
})

export class EditStaffsComponent implements OnInit {

  submitted: boolean = false;
  imageModified: boolean = false;
  imgPrev: any = '';
  downloadURL: Observable<string>
  fb: any;
  ifActive: boolean;

  staffItem = {
    name: "",
    designation: "",
    about: "",
    image: ""
  }

  constructor(private staffService: StaffService, private router: Router, private route: ActivatedRoute, private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.submitted = false;
    this.imageModified = false;
    let staffId = localStorage.getItem("adminEditStaffID");
    this.staffService.getstaff(staffId).subscribe((data) => {
      console.log(data);
      this.staffItem = JSON.parse(JSON.stringify(data));
      this.imgPrev = this.staffItem.image;
      this.ifActive = true;

    })
  }

  editStaff() {

    this.staffService.editStaff(this.staffItem)
      .subscribe(
        response => {
          if (response) {
            Swal.fire("Successfully Updated", "", "success")
              .then(() => {
                this.router.navigate(['../staffs'], { relativeTo: this.route });
              })
          }
          else {
            Swal.fire("Network Error", "Please do after sometime ", "error")
              .then(() => {
                this.router.navigate(['../staffs'], { relativeTo: this.route });
              })
          }
        });
  }


  updateImage(event: any) {
    this.ifActive = false;
    const file = event.target.files[0];
    console.log(file);
    var n = new Date();
    const filePath = `staffs/${n}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(`staffs/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          console.log('inside snapshot');
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.staffItem.image = url;
              this.ifActive = true;
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('hhhh', url);
        }
      });
  }

  closeForm() {
    this.router.navigate(['../staffs'], { relativeTo: this.route });
  }

}
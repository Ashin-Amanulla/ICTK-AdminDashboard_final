import { Component, OnInit, enableProdMode } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { StaffService } from '../staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'ngx-add-staffs',
  templateUrl: './add-staffs.component.html',
  styleUrls: ['./add-staffs.component.scss']
})
export class AddStaffsComponent implements OnInit {


  staffDetails = {
    name: "",
    designation: "",
    about: "",
    image: ""
  }

  downloadURL: Observable<string>
  fb: any;
  ifActive: boolean = false;
  submitted: boolean = false;


  constructor(private staffService: StaffService, private router: Router, private route: ActivatedRoute, private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.submitted = false;
    this.ifActive = false;
  }

  addStaff() {


    this.staffService.newStaff( this.staffDetails).subscribe(
      response => {
        if (response) {
          Swal.fire("Successfully Added", "success")
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
      })
  }

  selectImage(event: any) {
    this.ifActive = false;
    const file = event.target.files[0];
    var n = new Date();
    const filePath = `staffs/${n}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(`staffs/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.staffDetails.image = url;
              this.ifActive = true;
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('hhhh',url);
        }
      });
  }

  closeForm() {
    this.router.navigate(['../staffs'], { relativeTo: this.route });
  }

}
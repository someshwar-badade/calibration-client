import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { UserService } from 'src/app/services/user.service';
import { CompanyService } from 'src/app/services/company.service';

import Swal from 'sweetalert2'
import baseUrl from 'src/app/services/helper';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {

  user = {
    id:null,
    name:null,
    address:null,
    email:null,
    phone:null,
    logo:null
  }

  image:File;

  _snackBar: any;
  constructor(private companyService:CompanyService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<CompanyFormComponent>) { }

  ngOnInit(): void {
    if(this.data!=null){
      this.user = this.data;
    }
  }

  formSubmit(){
    console.log("formSubmit() called");
    console.log(this.user);

    if(this.user.name==''||this.user.name==null){
      // alert("Username is required");
      this._snackBar.open("Name is required !!","",{duration:5000})
      return;
    }

    // this.companyService.companyRegister(this.user).subscribe(
    //   (data)=>{
    //     console.log(data);
    //     Swal.fire('Success', 'Company is registered.', 'success');
    //   },
    //   (err)=>{
    //     console.log(err);
    //     alert("Error!!!")
    //   }
    // )


    if(this.user.id!=null){
      this.companyService.updateCompanyType(this.user).subscribe(
        (data) => {
          this.onClose();
          Swal.fire("Success", this.user.name + " Company added successfully.", "success");
        },
        (error) => {
          Swal.fire("Error !!", "Something went wrong", "error");
          return;
        }
  
      );
    }else{
      const formData = new FormData();
      formData.append('file',this.image);
      formData.append('name',this.user.name);
      formData.append('address',this.user.address);
      formData.append('email',this.user.email);
      formData.append('phone',this.user.phone);
      this.companyService.addCompanyType(formData).subscribe(
        (data) => {
          this.onClose();
          Swal.fire("Success", this.user.name + " Company added successfully.", "success");
        },
        (error) => {
          Swal.fire("Error !!", "Something went wrong", "error");
          return;
        }
  
      );
    }
    
  }

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Select File';

  baseUrl= `${baseUrl}`;

  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {

      this.image = fileInput.target.files[0];
      this.myfilename = '';
      Array.from(fileInput.target.files).forEach((file: File) => {
        console.log(file);
        this.myfilename += file.name + ',';
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.baseUrl.result;
        image.onload = rs => {

          // Return Base64 Data URL
          const imgBase64Path = e.baseUrl.result;
          

        };
      };
      reader.readAsDataURL(fileInput.baseUrl.files[0]);

      // Reset File Input to Selct Same file again
      this.uploadFileInput.nativeElement.value = "";
    } else {
      this.myfilename = 'Select File';
      this.image = null;
    }
  }
  
  clearForm() {
    this.user = { id: "", name: "", address: "",email: "", phone: "", logo: "" };
  }

  onClose(){
    this.clearForm();
    this.dialogRef.close();
  }
}

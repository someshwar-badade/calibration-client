import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DepartmentService } from 'src/app/services/department.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  // [x: string]: any;

  constructor(private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DepartmentFormComponent>) { }

  dept = { id:null, name: "", description: '', company: {id: ''} };

  ngOnInit(): void {
    if (this.data != null) {
      this.dept = this.data;
      // console.log("Dept form", this.dept);
      // console.log(this.dept);
    }
  }

  formSubmit() {
    console.log("on submit ",this.dept);
    if (this.dept.name.trim() =='' || this.dept.name == null) {
      Swal.fire("Error !!", "Department name is required.", "error");
      return;
    }
    if (this.dept.description.trim() == '' || this.dept.description == null) {
      Swal.fire("Error !!", "Description is required.", "error");
      return;
    }

    if (this.dept.id != "") {
      console.log("Update fun");
      console.log(this.dept);
      this.companyService.updateDepartment(this.dept).subscribe(
        (data) => {
          this.onClose();
          Swal.fire("Success", this.dept.name + " Department added successfully.", "success");
        },
        (error) => {
          Swal.fire("Error !!", "Something went wrong", "error");
          return;
        }

      );
    } else {
      console.log("Add fun");
      this.companyService.addDepartment(this.dept).subscribe(
        (data) => {
          this.onClose();
          Swal.fire("Success", this.dept.name + " Department added successfully.", "success");
        },
        (error) => {
          Swal.fire("Error !!", "Something went wrong", "error");
          return;
        }

      );
    }




  }

  clearForm() {
    this.dept = { id: "", name: "", description: '', company:{id:''} };
  }

  onClose() {
    this.clearForm();
    this.dialogRef.close();
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalibrationAgencyService } from 'src/app/services/calibration-agency.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calibration-agency-form',
  templateUrl: './calibration-agency-form.component.html',
  styleUrls: ['./calibration-agency-form.component.css']
})
export class CalibrationAgencyFormComponent implements OnInit {

  agency = null;
  constructor(private agencyService: CalibrationAgencyService, 
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<CalibrationAgencyFormComponent>) { 
  }

  ngOnInit(): void {
    this.agency = this.clearForm();
    if(this.data!=null){
      this.agency = {...this.data};
    }
  }


  formSubmit() {

    if(this.agency.id!=null){
      this.agencyService.updateAgency(this.agency).subscribe(
        (data) => {
          this.onClose();
          Swal.fire("Success", this.agency.name + "  updated successfully.", "success");
        },
        (error) => {
          Swal.fire("Error !!", "Something went wrong", "error");
          return;
        }
  
      );
    }else{
      this.agencyService.addAgency(this.agency).subscribe(
        (data) => {
          this.onClose();
          Swal.fire("Success", this.agency.name + " added successfully.", "success");
        },
        (error) => {
          Swal.fire("Error !!", "Something went wrong", "error");
          return;
        }
  
      );
    }

    

   
  }

  clearForm() {
    return  { id: "", name: "", address: '', email:"", mobile:"" };
  }

  onClose(){
    this.clearForm();
    this.dialogRef.close();
  }

}

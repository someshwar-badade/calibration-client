import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstrumentTypeMasterService } from 'src/app/services/instrument-type-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrument-type-master-form',
  templateUrl: './instrument-type-master-form.component.html',
  styleUrls: ['./instrument-type-master-form.component.css']
})
export class InstrumentTypeMasterFormComponent implements OnInit {

  constructor(private instrumentTypeMasterService: InstrumentTypeMasterService, 
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<InstrumentTypeMasterFormComponent>) { }

  instrumentTypeMaster = { id: "", shortName: "", description: '' };

  ngOnInit(): void {
    
    if(this.data!=null){
      this.instrumentTypeMaster = {...this.data};
    }
  }

  formSubmit() {

    if (this.instrumentTypeMaster.shortName.trim() == '' || this.instrumentTypeMaster.shortName == null) {
      Swal.fire("Error !!", "Short name is required.", "error");
      return;
    }
    if (this.instrumentTypeMaster.description.trim() == '' || this.instrumentTypeMaster.description == null) {
      Swal.fire("Error !!", "Description is required.", "error");
      return;
    }

    if(this.instrumentTypeMaster.id!=null){
      this.instrumentTypeMasterService.updateInstrumentType(this.instrumentTypeMaster).subscribe(
        (data) => {
          this.onClose();
          Swal.fire("Success", this.instrumentTypeMaster.shortName + " Instrument Type added successfully.", "success");
        },
        (error) => {
          Swal.fire("Error !!", "Something went wrong", "error");
          return;
        }
  
      );
    }else{
      this.instrumentTypeMasterService.addInstrumentType(this.instrumentTypeMaster).subscribe(
        (data) => {
          this.onClose();
          Swal.fire("Success", this.instrumentTypeMaster.shortName + " Instrument Type added successfully.", "success");
        },
        (error) => {
          Swal.fire("Error !!", "Something went wrong", "error");
          return;
        }
  
      );
    }

    

   
  }

  clearForm() {
    this.instrumentTypeMaster = { id: "", shortName: "", description: '' };
  }

  onClose(){
    this.clearForm();
    this.dialogRef.close();
  }
}

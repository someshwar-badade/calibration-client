import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentTypeMasterService } from 'src/app/services/instrument-type-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrument-type-master-parameter-form',
  templateUrl: './instrument-type-master-parameter-form.component.html',
  styleUrls: ['./instrument-type-master-parameter-form.component.css']
})
export class InstrumentTypeMasterParameterFormComponent implements OnInit {

  parameter = {
    id: "",
    instrumentType: {
      id: ""
    },
    parameter: "",
    parameterUom: '',
    accuracy: ''
  };

  units = [
    { id: 1, name: "mm" },
    { id: 1, name: "kg" },
    { id: 1, name: "gm" },
    { id: 1, name: "mg" },
    { id: 1, name: "ml" },
    { id: 1, name: "l" },
    { id: 1, name: "gl" },
    { id: 1, name: "cm" },
  ]
  
  constructor(private instrumentTypeMasterService: InstrumentTypeMasterService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<InstrumentTypeMasterParameterFormComponent>) { }

  ngOnInit(): void { 
    this.parameter = {...this.data};
    
  }

  formSubmit() {

    console.log(this.parameter);
    if (this.parameter.parameter.trim() == '' || this.parameter.parameter == null) {
      Swal.fire("Error !!", "parameter is required.", "error");
      return;
    }
    if (this.parameter.parameterUom.trim() == '' || this.parameter.parameterUom == null) {
      Swal.fire("Error !!", "unit of measure is required.", "error");
      return;
    }

    if (this.parameter.id != null) {
      this.instrumentTypeMasterService.updateInstrumentTypeParameter(this.parameter).subscribe(
        (data) => {
          this.onClose();
          Swal.fire("Success", this.parameter.parameter + " Parameter update successfully.", "success");
        },
        (error) => {
          Swal.fire("Error !!", "Something went wrong", "error");
          return;
        }

      );
    } else {
      this.instrumentTypeMasterService.addInstrumentTypeParameter(this.parameter).subscribe(
        (data) => {
          this.onClose();
          Swal.fire("Success", this.parameter.parameter + " Parameter  added successfully.", "success");

        },
        (error) => {
          Swal.fire("Error !!", "Something went wrong", "error");
          return;
        }

      );
    }

  }

  clearForm() {
    let instrumentTypeId = this.parameter.instrumentType.id;
    this.parameter = {
      id: "",
      instrumentType: {
        id: instrumentTypeId
      },
      parameter: "",
      parameterUom: '',
      accuracy: ''
    };
  }

  onClose() {
    this.clearForm();
    this.dialogRef.close();
  }

}

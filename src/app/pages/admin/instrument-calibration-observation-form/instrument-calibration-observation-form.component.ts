import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstrumentCalibrationService } from 'src/app/services/instrument-calibration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrument-calibration-observation-form',
  templateUrl: './instrument-calibration-observation-form.component.html',
  styleUrls: ['./instrument-calibration-observation-form.component.css']
})
export class InstrumentCalibrationObservationFormComponent implements OnInit {

  parameter = null;
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
  constructor(private calibrationService:InstrumentCalibrationService,@Inject(MAT_DIALOG_DATA) public data,public dialogRef:MatDialogRef<InstrumentCalibrationObservationFormComponent>) { }

  ngOnInit(): void {
    this.parameter = {...this.data};
  }

  formSubmit() {

    console.log(this.parameter);
    if (this.parameter.parameter.trim() == '' || this.parameter.parameter == null) {
      Swal.fire("Error !!", "parameter is required.", "error");
      return;
    }
    if (this.parameter.uom.trim() == '' || this.parameter.uom == null) {
      Swal.fire("Error !!", "unit of measure is required.", "error");
      return;
    }

    if (this.parameter.id != null) {
      this.calibrationService.updateObservation(this.parameter).subscribe(
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
      this.calibrationService.addObservation(this.parameter).subscribe(
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
    let calibrationId = this.parameter.instrumentCalibration.id;
    this.parameter = {
      id: "",
      instrumentCalibration: {
        id: calibrationId
      },
      parameter: "",
      uom: '',
      accuracy: '',
      value:'',
      observation1:'',
      observation2:'',
      observation3:'',
      observationText:''
    };
  }

  onClose() {
    this.clearForm();
    this.dialogRef.close();
  }
}

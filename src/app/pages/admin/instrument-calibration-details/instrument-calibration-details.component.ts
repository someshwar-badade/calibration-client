import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { InstrumentCalibrationService } from 'src/app/services/instrument-calibration.service';
import Swal from 'sweetalert2';
import { InstrumentCalibrationFormComponent } from '../instrument-calibration-form/instrument-calibration-form.component';
import { InstrumentCalibrationObservationFormComponent } from '../instrument-calibration-observation-form/instrument-calibration-observation-form.component';

@Component({
  selector: 'app-instrument-calibration-details',
  templateUrl: './instrument-calibration-details.component.html',
  styleUrls: ['./instrument-calibration-details.component.css']
})
export class InstrumentCalibrationDetailsComponent implements OnInit {

  calibrationDetails = null;
  calibrationId = null;
  dataSource = null;
  total = 0;
  parameter = null;

  public columnList = ['parameter', 'uom', 'accuracy','value', 'observation1', 'observation2', 'observation3', 'observationText','actions'];
  constructor(private calibrationService:InstrumentCalibrationService,
    private dialog:MatDialog,
    private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.calibrationId = this._route.snapshot.params.calibrationId;
    console.log(this.calibrationId);
    this.getCalibrationDetails();
    this.getObservationParameters();
    this.parameter = this.clearForm();
  }
  
  getCalibrationDetails() {
    this.calibrationService.getDetails(this.calibrationId).subscribe(
      (res)=>{
       console.log(res);
        this.calibrationDetails = res;
      },
      (error)=>{
        console.log(error)
      }
    );
  }

  onCreate(){
    this.parameter = this.clearForm();
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = this.parameter;
    this.dialog.open(InstrumentCalibrationObservationFormComponent,dialogConfig);
  }
  onEdit(row){
    this.parameter = this.clearForm();
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = row;
    this.dialog.open(InstrumentCalibrationObservationFormComponent,dialogConfig);
  }

  onEditCalibration(row){
    console.log('onedit....');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = row;
    this.dialog.open(InstrumentCalibrationFormComponent,dialogConfig);
  }

  deleteRecord(row){

    Swal.fire({
      title:"Are you sure ?",
      icon:"info",
      confirmButtonText:"Delete",
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.calibrationService.deleteObservation(row).subscribe(
          (data)=>{
            Swal.fire("Success", row.parameter + " Parameter deleted successfully.", "success");
            this.getObservationParameters();
          },
          (err)=>{
            Swal.fire("Error !!", "Something went wrong", "error");
          }
        );
      }
    });

  }


  clearForm() {
   return {
    id: "",
    instrumentCalibration: {
      id: this.calibrationId
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

  getObservationParameters() {
    this.calibrationService.getObservations(this.calibrationId).subscribe(
      (res)=>{
     
        this.dataSource = res;
        this.total = this.dataSource.length;
      },
      (error)=>{
        console.log(error)
      }
    );
  }

}

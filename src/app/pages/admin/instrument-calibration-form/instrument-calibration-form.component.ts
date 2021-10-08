import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalibrationAgencyService } from 'src/app/services/calibration-agency.service';
import { DepartmentService } from 'src/app/services/department.service';
import { InstrumentCalibrationService } from 'src/app/services/instrument-calibration.service';
import { InstrumentMasterService } from 'src/app/services/instrument-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrument-calibration-form',
  templateUrl: './instrument-calibration-form.component.html',
  styleUrls: ['./instrument-calibration-form.component.css']
})
export class InstrumentCalibrationFormComponent implements OnInit {

  constructor(private instrumentCalibrationService: InstrumentCalibrationService,
    private instrumentMasterService: InstrumentMasterService,
    private calibrationAgencyService: CalibrationAgencyService,
    private departmentService: DepartmentService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<InstrumentCalibrationFormComponent>) { }

    instrumentCalibration = {
    id: null,
    
    logno: "",
    dateOfCalibration: "",
    refNo: "",
    remark: "",
    isExternal: null,
    calibrationAgency: null,
    instrumentMaster: null,
    calibrationObservation:null,
    doneBy: "",
    calibrationCompletedDate: "",
    certificateNo: ""
  };

  instruments = [];
  // instruments = ["one","two","three"];
  departments :any = null;
  calibrationAgencies :any= null;

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

  maxDate: Date = new Date();
  ngOnInit(): void {

    //get instrument type list
    this.instrumentMasterService.getInstruments(0,10,'code','ASC','').subscribe(
      (res) => {
        console.log(res);
        this.instruments = res.content;
      },
      (error) => {
        console.log(error);
      }
    );

     //get departments list
     this.departmentService.getDepartments().subscribe(
      (res) => {
        console.log(res);
        this.departments = res.data;
      },
      (error) => {
        console.log(error);
      }
    );

    //get calibration agency list
    this.calibrationAgencyService.calibrationAgencies().subscribe(
      (res) => {
        console.log(res);
        this.calibrationAgencies = res.data;
      },
      (error) => {
        console.log(error);
      }
    );


    if (this.data != null) {
      this.instrumentCalibration = {...this.data};
    }

  }

  instrumentChange(event){
    
    this.instrumentMasterService.getInstruments(0,10,'code','ASC',event.target.value).subscribe(
      (res) => {
        console.log(res);
        this.instruments = res.content;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formSubmit() {

    console.log(this.instrumentCalibration);
    if (this.instrumentCalibration.instrumentMaster.id == '' || this.instrumentCalibration.instrumentMaster.id == null) {
      Swal.fire("Error !!", "Instrument is required.", "error");
      return;
    }
   

    if (this.instrumentCalibration.id != null) {
      this.instrumentCalibrationService.updateRecord(this.instrumentCalibration).subscribe(
        (data) => {
          this.onClose();
          Swal.fire("Success"," Instrument calibration added successfully.", "success");
        },
        (error) => {
          Swal.fire("Error !!", "Something went wrong", "error");
          return;
        }

      );
    } else {
      this.instrumentCalibrationService.addRecord(this.instrumentCalibration).subscribe(
        (data) => {
          this.onClose();
          Swal.fire("Success", " Instrument Calibration added successfully.", "success");
        },
        (error) => {
          Swal.fire("Error !!", "Something went wrong", "error");
          return;
        }

      );
    }


  }

  clearForm() {
    this.instrumentCalibration = {
      id: null,
      
      logno: "",
      dateOfCalibration: "",
      refNo: "",
      remark: "",
      isExternal: null,
      calibrationAgency: null,
      instrumentMaster: null,
      calibrationObservation:null,
      doneBy: "",
      calibrationCompletedDate: "",
      certificateNo: ""
    };
  }

  onClose() {
    this.clearForm();
    this.dialogRef.close();
  }

  displayFn(element): string {
    return element && element.code ? element.code : '';
  }

}

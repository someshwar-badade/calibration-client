import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstrumentMasterService } from 'src/app/services/instrument-master.service';
import Swal from 'sweetalert2';
import { InstrumentTypeMasterService } from 'src/app/services/instrument-type-master.service';
import { CalibrationAgencyService } from 'src/app/services/calibration-agency.service';
import { DepartmentService } from 'src/app/services/department.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-instrument-master-form',
  templateUrl: './instrument-master-form.component.html',
  styleUrls: ['./instrument-master-form.component.css']
})
export class InstrumentMasterFormComponent implements OnInit {

  constructor(private instrumentMasterService: InstrumentMasterService,
    private instrumentTypeService: InstrumentTypeMasterService,
    private calibrationAgencyService: CalibrationAgencyService,
    private departmentService: DepartmentService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<InstrumentMasterFormComponent>) { }

   
  instrumentMaster = {
    id: null,
    instrumentType: {id:null},
    department:{id:null},
    code: "",
    description: "",
    make: "",
    purchaseDate: "",
    calibrationFrequency: null,
    nextCalibrationDate: "",
    lastCalibrationDate: "",
    whereUsed: "",
    calibrationRange: "",
    accuracy: "",
    accuracyUom: "",
    masterStd: "",
    leastCount: "",
    calibrationAgency: null,
    createdAt: "",
    updatedAt: "",
    createdById: "",
    updatedById: ""
  };

  instrumentTypes = [];
  departments :any = null;
  calibrationAgencies :any= null;

  units = [
    { id: 1, name: "mm" },
    { id: 2, name: "kg" },
    { id: 3, name: "gm" },
    { id: 4, name: "mg" },
    { id: 5, name: "ml" },
    { id: 6, name: "l" },
    { id: 7, name: "gl" },
    { id: 8, name: "cm" },
  ]
  selectedUnit = { id: 2, name: "kg" };
  maxDate: Date = new Date();
  ngOnInit(): void {

   
    if (this.data != null) {
      this.instrumentMaster = {...this.data};
    }

    //get instrument type list
    this.instrumentTypeService.getInstrumentTypesAll().subscribe(
      (res) => {
        this.instrumentTypes = res.data;
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



    


  }

  formSubmit() {

    console.log(this.instrumentMaster);
    if (this.instrumentMaster.code.trim() == '' || this.instrumentMaster.code == null) {
      Swal.fire("Error !!", "Instrument code is required.", "error");
      return;
    }
    if (this.instrumentMaster.description.trim() == '' || this.instrumentMaster.description == null) {
      Swal.fire("Error !!", "Description is required.", "error");
      return;
    }

    if (this.instrumentMaster.id != null) {
      this.instrumentMasterService.updateInstrument(this.instrumentMaster).subscribe(
        (data) => {
          this.onClose();
          Swal.fire("Success", this.instrumentMaster.code + " Instrument Type added successfully.", "success");
        },
        (error) => {
          Swal.fire("Error !!", "Something went wrong", "error");
          return;
        }

      );
    } else {
      this.instrumentMasterService.addInstrument(this.instrumentMaster).subscribe(
        (data) => {
          this.onClose();
          Swal.fire("Success", this.instrumentMaster.code + " Instrument Type added successfully.", "success");
        },
        (error) => {
          Swal.fire("Error !!", "Something went wrong", "error");
          return;
        }

      );
    }


  }

  clearForm() {
    this.instrumentMaster = {
      id: null,
      instrumentType: {id:null},
      department: {id:null},
      code: "",
      description: "",
      make: "",
      purchaseDate: "",
      calibrationFrequency: null,
      nextCalibrationDate: "",
      lastCalibrationDate: "",
      whereUsed: "",
      calibrationRange: "",
      accuracy: "",
      accuracyUom: "",
      masterStd: "",
      leastCount: "",
      calibrationAgency: null,
      createdAt: "",
      updatedAt: "",
      createdById: "",
      updatedById: ""
    };
  }

  onClose() {
    this.clearForm();
    this.dialogRef.close();
  }

}

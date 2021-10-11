import { Component, OnInit } from '@angular/core';
import { InstrumentTypeMasterService } from 'src/app/services/instrument-type-master.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { InstrumentTypeMasterParameterFormComponent } from '../instrument-type-master-parameter-form/instrument-type-master-parameter-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-instrument-type-master-details',
  templateUrl: './instrument-type-master-details.component.html',
  styleUrls: ['./instrument-type-master-details.component.css']
})
export class InstrumentTypeMasterDetailsComponent implements OnInit {

  instrumentTypeDetails = null;
  dataSource = null;
  total = 0;
  instrumentTypeId = '';
  parameter = {
    id: "",
    instrumentType: {
      id: ""
    },
    parameter: "",
    parameterUom: '',
    accuracy: ''
  };

  public columnList = ['parameter', 'parameterUom', 'accuracy', 'actions'];
  constructor(private instrumentTypeMasterService: InstrumentTypeMasterService,
    private _route:ActivatedRoute,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.instrumentTypeId = this._route.snapshot.params.instrumentTypeId;
    this.getInstrumentTypeDetails();
    this.getInstrumentTypeParameters();
    this.clearForm();
  }

  onCreate(){
    this.clearForm();
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = this.parameter;
    this.dialog.open(InstrumentTypeMasterParameterFormComponent,dialogConfig).afterClosed().subscribe(()=>this. getInstrumentTypeParameters());
  }

  getInstrumentTypeDetails(){
    this.instrumentTypeMasterService.getInstrumentType(this.instrumentTypeId).subscribe(
      (res)=>{
       
        this.instrumentTypeDetails = res;
      },
      (error)=>{
        console.log(error)
      }
    );
  }

  getInstrumentTypeParameters(){
    this.instrumentTypeMasterService.getInstrumentTypeParameters(this.instrumentTypeId).subscribe(
      (res)=>{
      
        this.dataSource = res;
        this.total = this.dataSource.length;
      },
      (error)=>{
        console.log(error)
      }
    );
  }

  onEdit(row){
    
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = row;
    this.dialog.open(InstrumentTypeMasterParameterFormComponent,dialogConfig).afterClosed().subscribe(()=>this. getInstrumentTypeParameters());
  }

  deleteRecord(row){

    Swal.fire({
      title:"Are you sure ?",
      icon:"info",
      confirmButtonText:"Delete",
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.instrumentTypeMasterService.deleteInstrumentTypeParameter(row).subscribe(
          (data)=>{
            Swal.fire("Success", row.parameter + " Parameter deleted successfully.", "success");
            this.getInstrumentTypeParameters();
          },
          (err)=>{
            Swal.fire("Error !!", "Something went wrong", "error");
          }
        );
      }
    });

  }

  clearForm() {
    this.parameter = {
      id: "",
      instrumentType: {
        id: this._route.snapshot.params.instrumentTypeId
      },
      parameter: "",
      parameterUom: '',
      accuracy: ''
    };
  }

}

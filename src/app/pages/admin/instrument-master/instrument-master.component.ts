import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { map, tap } from 'rxjs/operators';
import { InstrumentMasterService } from 'src/app/services/instrument-master.service';
import Swal from 'sweetalert2';
import { InstrumentMasterFormComponent } from '../instrument-master-form/instrument-master-form.component';



@Component({
  selector: 'app-instrument-master',
  templateUrl: './instrument-master.component.html',
  styleUrls: ['./instrument-master.component.css']
})
export class InstrumentMasterComponent implements OnInit {

  dataSource = null;
  pageEvent: PageEvent;
  sortEvent: Sort;
  
  searchKeyWord ='';
  pageNo = 0;
  pageSize = 10;
  sortCol = "id";
  sortDirection = "ASC";

  public columnList = ['id', 'instrumentType', 'department', 'code',
  'description', 'make', 'purchaseDate', 'calibrationFrequency', 'nextCalibrationDate', 'lastCalibrationDate',
  'whereUsed', 'calibrationRange', 'accuracy', 'accuracyUom', 'masterStd', 'leastCount', 'calibrationAgency', 'createdAt', 'updatedAt','actions'];
  public columnShowHideList: any[] = [];

  constructor(private instrumentMasterService:InstrumentMasterService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.initializeColumnProperties();
    this.initDatasource();
  }

  displayedColumns: string[] = ['id', 'instrumentType', 'department', 'code',
    'description', 'make', 'purchaseDate', 'calibrationFrequency', 'nextCalibrationDate', 'lastCalibrationDate',
    'whereUsed', 'calibrationRange', 'accuracy', 'accuracyUom', 'masterStd', 'leastCount', 'calibrationAgency', 'createdAt', 'updatedAt','actions'];
  // dataSource = ELEMENT_DATA;

  toggleColumn(column) {
    if (column.isActive) {
      if (column.possition > this.columnList.length - 1) {
        this.columnList.push(column.name);
      } else {
        this.columnList.splice(column.possition, 0, column.name);
      }
    } else {
      let i = this.columnList.indexOf(column.name);
      let opr = i > -1 ? this.columnList.splice(i, 1) : undefined;
    }
  }

  initializeColumnProperties() {
    this.columnList.forEach((element, index) => {
      this.columnShowHideList.push(
        { possition: index, name: element, isActive: true }
      );
    });

  }
  
  initDatasource() {
    this.getDataSource(this.pageNo, this.pageSize, this.sortCol, this.sortDirection,this.searchKeyWord);
  }

  getDataSource(pageNo, pageSize, sortCol, sortDirection,searchKeyWord) {
    this.instrumentMasterService.getInstruments(pageNo, pageSize, sortCol, sortDirection,searchKeyWord).pipe(
      tap(res => console.log(res)),
      map((res) => { this.dataSource = res })
    ).subscribe();
  }

  applyFilter(event) {
    console.log(event);
    this.initDatasource();
  }

  onPaginateChange(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.pageNo = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.getDataSource(this.pageNo, this.pageSize, this.sortCol, this.sortDirection,this.searchKeyWord);
  }

  onSortChange(sort: Sort) {
    this.sortEvent = sort;
    this.sortCol = sort.active;
    this.sortDirection = sort.direction.toUpperCase();
    this.getDataSource(this.pageNo, this.pageSize, this.sortCol, this.sortDirection,this.searchKeyWord);
  }

  onCreate(){
    console.log('oncreate....');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    this.dialog.open(InstrumentMasterFormComponent,dialogConfig);
  }
  onEdit(row){
    
    console.log('onedit....');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = row;
    this.dialog.open(InstrumentMasterFormComponent,dialogConfig);
  }

  deleteRecord(row){

    Swal.fire({
      title:"Are you sure ?",
      icon:"info",
      confirmButtonText:"Delete",
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.instrumentMasterService.deleteInstrument(row.id).subscribe(
          (data)=>{
            Swal.fire("Success", "Instrument deleted successfully.", "success");
            this.initDatasource();
          },
          (err)=>{
            Swal.fire("Error !!", "Something went wrong", "error");
          }
        );
      }
    });

    
  }
}
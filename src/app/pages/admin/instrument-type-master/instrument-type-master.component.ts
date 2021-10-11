import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { InstrumentTypeMasterService } from 'src/app/services/instrument-type-master.service';
import Swal from 'sweetalert2';
import { InstrumentTypeMasterFormComponent } from '../instrument-type-master-form/instrument-type-master-form.component';
import { InstrumentMasterFormComponent } from '../instrument-master-form/instrument-master-form.component';


interface CustomColumn {
  possition: number;
  name: string;
  displayName: string;
  isActive: boolean;
}


@Component({
  selector: 'app-instrument-type-master',
  templateUrl: './instrument-type-master.component.html',
  styleUrls: ['./instrument-type-master.component.css']
})

export class InstrumentTypeMasterComponent implements OnInit {


  dataSource = null;
  pageEvent: PageEvent;
  sortEvent: Sort;
  total = 0;
  searchKeyWord='';
  pageNo = 0;
  pageSize = 10;
  sortCol = "id";
  sortDirection = "ASC";

  instrumentMaster = null;

  instrumentTypeMaster = { id: "", shortName: "", description: '' };
  public columnList = ['id', 'icon', 'shortName', 'description', 'actions'];
  public columnShowHideList: CustomColumn[] = [];

  constructor(private instrumentTypeMasterService: InstrumentTypeMasterService, private router: Router,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.initializeColumnProperties();
    this.initDatasource();
  }

  //displayedColumns: string[] = ['id', 'icon', 'shortName', 'description', 'actions'];


  applyFilter(event) {
    console.log(event);
    this.initDatasource();
  }

  initDatasource() {
    this.getDataSource(this.pageNo, this.pageSize, this.sortCol, this.sortDirection,this.searchKeyWord);
  }

  getDataSource(pageNo, pageSize, sortCol, sortDirection,searchKeyWord) {
    this.instrumentTypeMasterService.getInstrumentTypes(pageNo, pageSize, sortCol, sortDirection,searchKeyWord).pipe(
      tap(res => console.log(res)),
      map((res) => { this.dataSource = res })
    ).subscribe();
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

    this.dialog.open(InstrumentTypeMasterFormComponent,dialogConfig).afterClosed().subscribe(()=>this.initDatasource());
  }

  onEdit(row){
    
    console.log('onedit....');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = row;
    this.dialog.open(InstrumentTypeMasterFormComponent,dialogConfig).afterClosed().subscribe(()=>this.initDatasource());
  }

  deleteRecord(row){

    Swal.fire({
      title:"Are you sure ?",
      icon:"info",
      confirmButtonText:"Delete",
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.instrumentTypeMasterService.deleteInstrumentType(row).subscribe(
          (data)=>{
            Swal.fire("Success", row.shortName + " Instrument Type deleted successfully.", "success");
            this.initDatasource();
          },
          (err)=>{
            Swal.fire("Error !!", "Something went wrong", "error");
          }
        );
      }
    });

    


  }

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
        { possition: index, 
          name: element,
          displayName: element.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").toLocaleUpperCase(),
         isActive: true }
      );
    });
  
  }

  onCreateInstrument(row){
    console.log('oncreate....');
    this.instrumentMaster = this.clearInstrumentMaster();
    this.instrumentMaster.instrumentType.id=row.id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    dialogConfig.data = this.instrumentMaster;
    this.dialog.open(InstrumentMasterFormComponent,dialogConfig);
  }

  clearInstrumentMaster(){
  return  {
      id: null,
      instrumentType:{id:null},
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
      calibrationAgency:{id:null},
      createdAt: "",
      updatedAt: "",
      createdById: "",
      updatedById: ""
    }
  }
}

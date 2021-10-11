import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { CalibrationAgencyService } from 'src/app/services/calibration-agency.service';
import Swal from 'sweetalert2';
import { CalibrationAgencyFormComponent } from '../calibration-agency-form/calibration-agency-form.component';

@Component({
  selector: 'app-calibration-agency',
  templateUrl: './calibration-agency.component.html',
  styleUrls: ['./calibration-agency.component.css']
})
export class CalibrationAgencyComponent implements OnInit {

  dataSource = null;
  pageEvent: PageEvent;
  sortEvent: Sort;
  total = 0;
  searchKeyWord='';
  pageNo = 0;
  pageSize = 10;
  sortCol = "id";
  sortDirection = "ASC";

  agency = null;

  public columnList = ['id', 'name', 'address', 'email','mobile', 'actions'];
  public columnShowHideList: any[] = [];

  constructor(private agencyService: CalibrationAgencyService, private router: Router,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.initializeColumnProperties();
    this.initDatasource();
  }

 

  applyFilter(event) {
    console.log(event);
    this.initDatasource();
  }

  initDatasource() {
    this.getDataSource(this.pageNo, this.pageSize, this.sortCol, this.sortDirection,this.searchKeyWord);
  }

  getDataSource(pageNo, pageSize, sortCol, sortDirection,searchKeyWord) {
    //pageNo, pageSize, sortCol, sortDirection,searchKeyWord
    this.agencyService.getAllFiltered(pageNo, pageSize, sortCol, sortDirection,searchKeyWord).pipe(
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

    this.dialog.open(CalibrationAgencyFormComponent,dialogConfig).afterClosed().subscribe(()=>this.initDatasource());
  }

  onEdit(row){
    
    console.log('onedit....');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = row;
    this.dialog.open(CalibrationAgencyFormComponent,dialogConfig).afterClosed().subscribe(()=>this.initDatasource());
  }

  deleteRecord(row){

    Swal.fire({
      title:"Are you sure ?",
      icon:"info",
      confirmButtonText:"Delete",
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.agencyService.deleteAgency(row).subscribe(
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

}

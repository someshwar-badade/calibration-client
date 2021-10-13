import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { DepartmentService } from 'src/app/services/department.service';
import { DepartmentFormComponent } from '../department-form/department-form.component';

interface CustomColumn {
  possition: number;
  name: string;
  isActive: boolean;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})

export class DepartmentComponent implements OnInit {

  companyDetails = null;
  companyId = null;
  dataSource = null;
  pageEvent: PageEvent;
  sortEvent: Sort;
  total = 0;
  searchKeyWord='';
  pageNo = 0;
  pageSize = 10;
  sortCol = "id";
  sortDirection = "ASC";

  temp = null;

  department = { id: "", deptname: "", description: '' };
  public columnList = ['id', 'icon', 'deptname', 'description', 'actions'];
  public columnShowHideList: CustomColumn[] = [];

  constructor(private departmentService: DepartmentService, 
    private _route:ActivatedRoute,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.initializeColumnProperties();
    this.initDatasource();
    this.companyId = this._route.snapshot.params.companyId;
    // this.getCompanyDetails();
  }

  applyFilter(event) {
    console.log(event);
    this.initDatasource();
  }

  initDatasource() {
    this.getDataSource(this.pageNo, this.pageSize, this.sortCol, this.sortDirection,this.searchKeyWord);
  }

  getDataSource(pageNo, pageSize, sortCol, sortDirection,searchKeyWord) {
    this.departmentService.getDepartmentTypes(pageNo, pageSize, sortCol, sortDirection,searchKeyWord).pipe(
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

    this.dialog.open(DepartmentFormComponent,dialogConfig);
  }

  getCompanyDetails(){
    this.departmentService.getCompany(this.companyId).subscribe(
      (res)=>{
       
        this.companyDetails = res;
      },
      (error)=>{
        console.log(error)
      }
    );
  }
  
  onEdit(row){
    
    console.log('onedit....');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = row;
    this.dialog.open(DepartmentFormComponent,dialogConfig);
  }

  deleteRecord(row){

    Swal.fire({
      title:"Are you sure ?",
      icon:"info",
      confirmButtonText:"Delete",
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.departmentService.deleteDepartment(row).subscribe(
          (data)=>{
            Swal.fire("Success", row.departmentName + " Department deleted successfully.", "success");
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
        { possition: index, name: element, isActive: true }
      );
    });
  
  }

  onCreateDepartment(row){
    console.log('oncreate....');
    this.temp = this.clearDepartment();
    this.temp.instrumentType.id=row.id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    dialogConfig.data = this.departmentService;
    this.dialog.open(DepartmentFormComponent,dialogConfig);
  }

  clearDepartment(){
  return  {
      id: null,
      instrumentType: {
        id:'',
      },
      department: {
        id:'',
      },
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
      calibrationAgency: {
        id:'',
      },
      createdAt: "",
      updatedAt: "",
      createdById: "",
      updatedById: ""
    }
  }
}

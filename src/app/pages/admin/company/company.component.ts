import { Component, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
// import { InstrumentTypeMasterService } from 'src/app/services/instrument-type-master.service';
import { CompanyService} from 'src/app/services/company.service';
import Swal from 'sweetalert2';
// import { InstrumentMasterFormComponent } from '../instrument-master-form/instrument-master-form.component';
import { CompanyFormComponent } from '../company-form/company-form.component';
import baseUrl from 'src/app/services/helper';
// import { AddCompanyLogoComponent } from '../add-company-logo/add-company-logo.component';

interface CustomColumn {
  possition: number;
  name: string;
  isActive: boolean; 
}

// const ELEMENT_DATA = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  [x: string]: any;
  dataSource = null;
  pageEvent: PageEvent;
  sortEvent: Sort;
  total = 0;

  pageNo = 0;
  pageSize = 10;
  sortCol = "id";
  sortDirection = "ASC";

  baseUrl= `${baseUrl}`;

  // '${baseUrl}';
  // "http://localhost:8080";

  companyTypeMaster = { id: "", name: "", address: '', logo: '' };
  public columnList = ['id', 'icon', 'name', 'address', 'actions'];
  public columnShowHideList: CustomColumn[] = [];

  constructor(private CompanyService: CompanyService, private router: Router,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.initializeColumnProperties();
        this.initDatasource();
      }
  // constructor() { }

  // ngOnInit(): void {
  // }

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;

  applyFilter(event) {
    console.log(event);

  }

  initDatasource() {
    this.getDataSource(this.pageNo, this.pageSize, this.sortCol, this.sortDirection);
  }

  getDataSource(pageNo, pageSize, sortCol, sortDirection) {
    this.CompanyService.getCompanyTypes(pageNo, pageSize, sortCol, sortDirection).pipe(
      tap(res => console.log(res)),
      map((res) => { this.dataSource = res; this.total = res.length; })
      // map((res) => { this.dataSource = res.data; this.total = res.total; })
    ).subscribe();
  }

  

  onPaginateChange(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.pageNo = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.getDataSource(this.pageNo, this.pageSize, this.sortCol, this.sortDirection);
  }

  onSortChange(sort: Sort) {
    this.sortEvent = sort;
    this.sortCol = sort.active;
    this.sortDirection = sort.direction;
    this.getDataSource(this.pageNo, this.pageSize, this.sortCol, this.sortDirection);
  }

  onCreate(){
    console.log('oncreate....');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    this.dialog.open(CompanyFormComponent,dialogConfig);
  }
  onEdit(row){
    
    console.log('onedit....');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = row;
    this.dialog.open(CompanyFormComponent,dialogConfig);
  }

  deleteRecord(row){
    this.CompanyService.deleteCompanyType(row).subscribe(
      (data)=>{
        Swal.fire("Success", row.name + " Company deleted successfully.", "success");
        this.initDatasource();
      },
      (err)=>{
        Swal.fire("Error !!", "Something went wrong", "error");
      }
    );
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
    // After for loop it will look like this
    //   public columnShowHideList = [
    //   { possition: 0, name: 'action', isActive: true },
    //   { possition: 1, name: 'userName', isActive: true },
    //   { possition: 2, name: 'email', isActive: true },
    //   { possition: 3, name: 'contactNo', isActive: true },
    //   { possition: 4, name: 'address', isActive: true }
    // ];
  }
  

  }


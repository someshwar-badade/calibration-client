import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { CompanyService} from 'src/app/services/company.service';
import Swal from 'sweetalert2';
import { DepartmentFormComponent } from '../department-form/department-form.component';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  dataSource = null;
  total = 0;
  companyDetails = null;
  companyId = null;

  deptDetails = {
    id: "",
    company: {
      id: ""
    },
    name: "",
    description: ""
  };

  // columnList = { id: "", name: "", description: ''};
  public columnList = ['id', 'name', 'description', 'actions'];
  constructor(private companyService: CompanyService, 
    private _route:ActivatedRoute,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.deptDetails.company.id = this._route.snapshot.params.companyId;
    // this.initDatasource();
    this.getCompanyDetails();
    // this.getInstrumentTypeParameters();
    this.getDepartments();

  }

  onCreate(){
    console.log('oncreate....');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = this.deptDetails;
    // console.log(this.companyId);
    this.dialog.open(DepartmentFormComponent,dialogConfig);
  }
  onEdit(row){
    
    console.log('onedit....');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = row;
    // console.log(row);
    this.dialog.open(DepartmentFormComponent,dialogConfig);
  }

  deleteDepartment(row){

    Swal.fire({
      title:"Are you sure ?",
      icon:"info",
      confirmButtonText:"Delete",
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.companyService.deleteDepartment(row).subscribe(
          (data)=>{
            Swal.fire("Success", row.parameter + " Department deleted successfully.", "success");
            this.getDepartments();
          },
          (err)=>{
            Swal.fire("Error !!", "Something went wrong", "error");
          }
        );
      }
    });
  }

  // initDatasource() {
  //   this.getDataSource(this.pageNo, this.pageSize, this.sortCol, this.sortDirection);
  // }

  // getDataSource(pageNo, pageSize, sortCol, sortDirection) {
  //   this.companyService.getCompanyTypes(pageNo, pageSize, sortCol, sortDirection).pipe(
  //     tap(res => console.log(res)),
  //     map((res) => { this.dataSource = res; this.total = res.length; })
  //     // map((res) => { this.dataSource = res.data; this.total = res.total; })
  //   ).subscribe();
  // }

  
  getCompanyDetails(){
    this.companyService.getCompany(this.deptDetails.company.id).subscribe(
      (res)=>{
       console.log(res)
        this.companyDetails = res;
      },
      (error)=>{
        console.log(error)
      }
    );
  }

  getDepartments(){
    this.companyService.getDepartments(this.deptDetails.company.id).subscribe(
      (res)=>{
        console.log(res)
        this.dataSource = res;
        this.total = this.dataSource.length;
      },
      (error)=>{
        console.log(error)
      }
    );
  }

  clearForm() {
    this.deptDetails = {
      id: "",
      company: {
        id: this._route.snapshot.params.companyId
      },
     name: "",
    description: ""
    };
  }

}

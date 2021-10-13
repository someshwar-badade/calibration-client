import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import baseUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }
  //Company Registration
  public companyRegister(user:any){
    return this.http.post(`${baseUrl}/api/company`,user);
  }

  //Get List of company
  // public companyList(){
  //   return this.http.get(`${baseUrl}/api/company`);
  // }


  //get all categories
  public getCompanyTypes(pageNumber, pageSize, sortBy, sortDirection) : Observable<any> {
    return this.http.get(`${baseUrl}/api/company`,{
      params:new HttpParams()
      .set('pageNo',pageNumber)
      .set('pageSize',pageSize)
      .set('sortBy',sortBy)
      .set('sortDirection',sortDirection)
    }).pipe(
      map((res)=>res)
    );
  }
 
  public getCompany(getCompanyId) : Observable<any> {
    return this.http.get(`${baseUrl}/api/company/${getCompanyId}`);
  }

  //add
  public addCompanyType(user:any){
    return this.http.post(`${baseUrl}/api/company`,user);
  }

  //update 
  public updateCompanyType(user:any){
    return this.http.put(`${baseUrl}/api/company/${user.id}`,user);
  }

  //delete
  public deleteCompanyType(user:any){
    return this.http.delete(`${baseUrl}/api/company/${user.id}`);
  }

  public getDepartments(getCompanyId) : Observable<any> {
    return this.http.get(`${baseUrl}/api/department/company/${getCompanyId}`);
  }

  //add
  public addDepartment(department:any){
    return this.http.post(`${baseUrl}/api/department`,department);
  }

  //update 
  public updateDepartment(department:any){
    return this.http.put(`${baseUrl}/api/department`,department);
  }

  //delete
  public deleteDepartment(department:any){
    return this.http.delete(`${baseUrl}/api/department/${department.id}`);
  }

}
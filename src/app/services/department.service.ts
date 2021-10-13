import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }

   //get all categories
   public getDepartments():Observable<any>{
    return this.http.get(`${baseUrl}/api/department`);
  }

  // public getDepartments() : Observable<any> {
  //   return this.http.get(`${baseUrl}/department`).pipe(
  //     map((res)=>res)
  //   );
  // }

  //filtered
  public getDepartmentTypes(pageNumber, pageSize, sortBy, sortDirection,searchKeyWord='') : Observable<any> {
    return this.http.get(`${baseUrl}/department`,{
      params:new HttpParams()
      .set('pageNumber',pageNumber)
      .set('pageSize',pageSize)
      .set('sortBy',sortBy)
      .set('sortDirection',sortDirection)
      .set('searchKeyWord',searchKeyWord)
    }).pipe(
      map((res)=>res)
    );
  }
  
  public getCompany(getCompanyId) : Observable<any> {
    return this.http.get(`${baseUrl}/api/company/${getCompanyId}`);
  }

  //add
  public addDepartment(instrumentType:any){
    return this.http.post(`${baseUrl}/department`,instrumentType);
  }
 

  //update 
  public updateDepartment(instrumentType:any){
    return this.http.put(`${baseUrl}/department`,instrumentType);
  }


  //delete
  public deleteDepartment(instrumentType:any){
    return this.http.delete(`${baseUrl}/department/${instrumentType.id}`);
  }
  
}

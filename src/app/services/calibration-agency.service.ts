import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CalibrationAgencyService {

  constructor(private http:HttpClient) { }

   //get all categories
   public calibrationAgencies():Observable<any>{
    return this.http.get(`${baseUrl}/api/calibration-agency`);
  }

  //get all categories
  public getAllFiltered(pageNumber, pageSize, sortBy, sortDirection,searchKeyWord='') : Observable<any> {
    return this.http.get(`${baseUrl}/api/calibration-agency/filtered`,{
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

   //add
   public addAgency(agency:any){
    return this.http.post(`${baseUrl}/api/calibration-agency`,agency);
  }
 
  //update 
  public updateAgency(agency:any){
    return this.http.put(`${baseUrl}/api/calibration-agency`,agency);
  }
  
  //delete
  public deleteAgency(agency:any){
    return this.http.delete(`${baseUrl}/api/calibration-agency/${agency.id}`);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class InstrumentMasterService {

  constructor(private http:HttpClient) { }

  //get all categories
  public getInstruments(pageNumber, pageSize, sortBy, sortDirection,searchKeyWord='') : Observable<any> {
    return this.http.get(`${baseUrl}/api/instrument-master`,{
      params:new HttpParams()
      .set('pageNo',pageNumber)
      .set('pageSize',pageSize)
      .set('sortBy',sortBy)
      .set('sortDirection',sortDirection)
      .set('searchKeyWord',searchKeyWord)
    }).pipe(
      map((res)=>res)
    );
  }
 
  //add
  public addInstrument(instrumentType:any){
    return this.http.post(`${baseUrl}/api/instrument-master`,instrumentType);
  }

  //update 
  public updateInstrument(instrumentType:any){
    return this.http.put(`${baseUrl}/api/instrument-master`,instrumentType);
  }

  //delete
  public deleteInstrument(id:any){
    return this.http.delete(`${baseUrl}/api/instrument-master/${id}`);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class InstrumentTypeMasterService {

  constructor(private http:HttpClient) { }

  //get all instrument types
  public getInstrumentTypesAll() : Observable<any> {
    return this.http.get(`${baseUrl}/api/instrument-type-master/all`).pipe(
      map((res)=>res)
    );
  }

  //filtered
  public getInstrumentTypes(pageNumber, pageSize, sortBy, sortDirection,searchKeyWord='') : Observable<any> {
    return this.http.get(`${baseUrl}/api/instrument-type-master`,{
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

  public getInstrumentType(getInstrumentTypeId) : Observable<any> {
    return this.http.get(`${baseUrl}/api/instrument-type-master/${getInstrumentTypeId}`);
  }

 
 
  //add
  public addInstrumentType(instrumentType:any){
    return this.http.post(`${baseUrl}/api/instrument-type-master`,instrumentType);
  }
 

  //update 
  public updateInstrumentType(instrumentType:any){
    return this.http.put(`${baseUrl}/api/instrument-type-master`,instrumentType);
  }

  

  //delete
  public deleteInstrumentType(instrumentType:any){
    return this.http.delete(`${baseUrl}/api/instrument-type-master/${instrumentType.id}`);
  }


  public getInstrumentTypeParameters(getInstrumentTypeId) : Observable<any> {
    return this.http.get(`${baseUrl}/api/instrument-type-master-parameter/${getInstrumentTypeId}`);
  }

  //add parameter 
  public addInstrumentTypeParameter(instrumentTypeParameter:any){
    return this.http.post(`${baseUrl}/api/instrument-type-master-parameter`,instrumentTypeParameter);
  }

   //update parameter
   public updateInstrumentTypeParameter(instrumentTypeParameter:any){
    return this.http.put(`${baseUrl}/api/instrument-type-master-parameter`,instrumentTypeParameter);
  }

  //delete parameter
  public deleteInstrumentTypeParameter(instrumentTypeParameter:any){
    return this.http.delete(`${baseUrl}/api/instrument-type-master-parameter/${instrumentTypeParameter.instrumentType.id}/${instrumentTypeParameter.id}`);
  }
}

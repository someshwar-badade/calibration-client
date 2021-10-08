import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class InstrumentCalibrationService {

  constructor(private http:HttpClient) { }

  //get all categories
  public getAll(pageNumber, pageSize, sortBy, sortDirection,searchKeyWord='') : Observable<any> {
    return this.http.get(`${baseUrl}/api/instrument-calibration`,{
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
 
  //get details
  public getDetails(calibrationId:any){
    return this.http.get(`${baseUrl}/api/instrument-calibration/${calibrationId}`,);
  }

  //add
  public addRecord(instrumentType:any){
    return this.http.post(`${baseUrl}/api/instrument-calibration`,instrumentType);
  }

  //update 
  public updateRecord(instrumentType:any){
    return this.http.put(`${baseUrl}/api/instrument-calibration`,instrumentType);
  }

  //delete
  public deleteRecord(id:any){
    return this.http.delete(`${baseUrl}/api/instrument-calibration/${id}`);
  }

 //get details
 public getObservations(calibrationId:any){
  return this.http.get(`${baseUrl}/api/calibration-observation/${calibrationId}`,);
}

//add parameter 
public addObservation(observation:any){
  return this.http.post(`${baseUrl}/api/calibration-observation`,observation);
}

 //update parameter
 public updateObservation(observation:any){
  return this.http.put(`${baseUrl}/api/calibration-observation`,observation);
}

//delete parameter
public deleteObservation(observation:any){
  return this.http.delete(`${baseUrl}/api/calibration-observation/${observation.id}`);
}

}

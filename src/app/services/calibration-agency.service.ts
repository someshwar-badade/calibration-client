import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CalibrationAgencyService {

  constructor(private http:HttpClient) { }

   //get all categories
   public calibrationAgencies():Observable<any>{
    return this.http.get(`${baseUrl}/api/calibration-agency`)
  }
}

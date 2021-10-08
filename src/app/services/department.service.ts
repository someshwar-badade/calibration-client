import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}

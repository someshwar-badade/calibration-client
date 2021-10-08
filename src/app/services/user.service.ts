import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  //User Registration
  public userRegister(user:any){
    return this.http.post(`${baseUrl}/api/user`,user);
  }
}

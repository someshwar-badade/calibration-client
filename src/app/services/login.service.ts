import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();
  constructor(private http:HttpClient) { }

  //generate token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/api/generate-token`,loginData);
  }

   //get current user
   public getCurrentUser(){
    return this.http.get(`${baseUrl}/api/current-user`);
  }
  //login user: set token in localstorage
  public loginUser(token){
    localStorage.setItem('token',token);
    return true;
  }

  //isLogin: user is logged in or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr==undefined||tokenStr==''||tokenStr==null){
      return false;
    }else{
      return true;
    }
  }

  //logout: remove token from local storage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token
  public getToken(){
    return localStorage.getItem('token');
  }

  //set user details
  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
    return true;
  }

  //get user details
  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }

    this.logout();
    return null;
  }

  //get user role
  public getUserRole(){
    console.log(this.getUser(),"getUserrole()");
    if(!this.isLoggedIn()){
      return null;
    }

    let user = this.getUser();
    return user.authorities[0].authority;
  }

}

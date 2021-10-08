import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedin=false;
  user=null;
  
  constructor(public login:LoginService,private router:Router,public loaderService:LoaderService,
    @Inject(DOCUMENT) private document:Document, private renderer:Renderer2) { }

    ngOnInit(): void {
      this.isLoggedin = this.login.isLoggedIn();
      this.user = this.login.getUser();
      this.login.loginStatusSubject.asObservable().subscribe(data=>{
        this.isLoggedin = this.login.isLoggedIn();
        this.user = this.login.getUser();
      });

      const hostClass = localStorage.getItem('theme') +' mat-app-background';
      this.renderer.setAttribute(this.document.body,'class',hostClass);
     
  }

  logout(){
    this.login.logout();
    // window.location.reload();
    this.router.navigate(['login']);
    this.login.loginStatusSubject.next(false);
  }

}

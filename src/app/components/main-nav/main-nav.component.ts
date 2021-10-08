import { Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,public login:LoginService,private router:Router,public loaderService:LoaderService) {}


  isLoggedin=false;
  user=null;
  

    ngOnInit(): void {
      this.isLoggedin = this.login.isLoggedIn();
      this.user = this.login.getUser();
      this.login.loginStatusSubject.asObservable().subscribe(data=>{
        this.isLoggedin = this.login.isLoggedIn();
        this.user = this.login.getUser();
      });
      this.changeTheme(localStorage.getItem('theme'));
  }

  logout(){
    this.login.logout();
    // window.location.reload();
    this.router.navigate(['login']);
    this.login.loginStatusSubject.next(false);
  }
onDarkmodeSwitched({checked}:MatSlideToggleChange){
  this.darkModeSwitched.emit(checked);
}
changeTheme(theme){
  console.log(theme);
  this.darkModeSwitched.emit(theme);
}

}

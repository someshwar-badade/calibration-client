import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
  }
  constructor(private snak: MatSnackBar, public login: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {

    if(this.login.form.invalid) return;

    //request to server to generate token
    this.login.generateToken(this.login.form.value).subscribe(
      (data: any) => {


        //login...
        let isTokenSet = this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);

            if (this.login.getUserRole() == "ADMIN") {
              //redirect: ADMIN: admin-dashboard
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
            } else if (this.login.getUserRole() == "NORMAL") {
              //redirecct NORMAL normal-dashboard
              this.router.navigate(['user-dashboard']);
              this.login.loginStatusSubject.next(true);
            } else {
              //this.login.logout();
              //console.log("logout user");
              this.snak.open("Invalid credentials. Try again", "", {
                duration: 3000
              });
            }


          },
          (error) => {

          }
        );
      },
      (error) => {
        // console.log(error);
        this.snak.open("Invalid credentials. Try again", "", {
          duration: 3000
        });
      }
    )
  }

  clearForm(){
   this.login.form.reset();
  }
}

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
form = new FormGroup({
  username:new FormControl('',Validators.required),
  password:new FormControl('',Validators.required),
});
  user = {
    username: '',
    password: ''
  }
  constructor(private snak: MatSnackBar, private login: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {

    if (this.user.username.trim() == '' ||
      this.user.username == null) {
      this.snak.open("Username is required.", "", {
        duration: 3000
      });

      return;
    }

    if (this.user.password.trim() == '' ||
      this.user.password == null) {
      this.snak.open("Password is required.", "", {
        duration: 3000
      });

      return;
    }

    //request to server to generate token
    this.login.generateToken(this.user).subscribe(
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
    this.user = {
      username: '',
      password: ''
    }
  }
}

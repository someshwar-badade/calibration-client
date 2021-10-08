import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    username:null,
    password:null,
    firstName:null,
    lastName:null,
    email:null,
    phone:null
  }
  constructor(private userService:UserService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("formSubmit() called");
    console.log(this.user);

    if(this.user.username==''||this.user.username==null){
      // alert("Username is required");
      this._snackBar.open("Username is required !!","",{duration:5000})
      return;
    }

    this.userService.userRegister(this.user).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire('Success', 'User is registered.', 'success');
      },
      (err)=>{
        console.log(err);
        alert("Error!!!")
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    id:"",
    title:"",
    description:""
  }

  constructor(private categoryService:CategoryService,private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit(){

    if(this.category.title.trim()=='' || this.category.title==null){
      Swal.fire("Error !!","Category title is required.","error");
      return;
    }
    if(this.category.description.trim()=='' || this.category.description==null){
      Swal.fire("Error !!","Category description is required.","error");
      return;
    }

    this.categoryService.addCategory(this.category).subscribe(
      (data)=>{
        Swal.fire("Success",this.category.title + " Category added successfully.","success");
        this.router.navigate(["/admin/categories"]);
      },
      (error)=>{
        Swal.fire("Error !!","Something went wrong","error");
        return;
      }

    );
    console.log(this.category);
  }
}

import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  categories =[
    {
      id:1,
      title:"Title 1",
      description:"Description 1 Description 1 Description 1 Description 1 Description 1"
    },
    {
      id:1,
      title:"Title 2",
      description:"Description 2 Description  Description  Description 1Description "
    },
    {
      id:1,
      title:"Title 3",
      description:"Description 3 Description  Description  Description 1 Description "
    },
    {
      id:1,
      title:"Title 4",
      description:"Description 4 Description Description Description Description"
    },
    {
      id:1,
      title:"Title 5",
      description:"Description 5 Description 5 Description 5 Description 5 Description "
    }
  ];
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
     this.categoryService.categories().subscribe(
      (data:any)=>{
        this.categories = data;
        
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!","Error in loading data","error");
      }
    );
  }

}

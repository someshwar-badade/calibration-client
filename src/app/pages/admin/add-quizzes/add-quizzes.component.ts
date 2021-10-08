import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.css']
})
export class AddQuizzesComponent implements OnInit {

  quiz = {
      id:1,
      title:"",
      description:"",
      maxMarks:"",
      numberOfQuestions:"",
      active:false,
      category:{
        id:'',
        title:""
      }
    
  };
  constructor(private quizService:QuizService, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){

    if(this.quiz.title.trim()=='' || this.quiz.title==null){
      Swal.fire("Error !!","Category title is required.","error");
      return;
    }
    if(this.quiz.description.trim()=='' || this.quiz.description==null){
      Swal.fire("Error !!","Category description is required.","error");
      return;
    }

    this.quizService.addQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire("Success",this.quiz.title + " Category added successfully.","success");
        this.router.navigate(["/admin/quizzes"]);
      },
      (error)=>{
        Swal.fire("Error !!","Something went wrong","error");
        return;
      }

    );
    console.log(this.quiz);
  }
}

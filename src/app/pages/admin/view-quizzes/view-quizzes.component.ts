import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes =[
    {
      id:1,
      title:"Title 1",
      description:"Description 1 Description 1 Description 1 Description 1 Description 1",
      maxMarks:"100",
      numberOfQuestions:"50",
      active:'',
      category:{
        title:"Angular"
      }
    },
    {
      id:1,
      title:"Title 2",
      description:"Description 2 Description  Description  Description 1Description ",
      maxMarks:"200",
      numberOfQuestions:"100",
      active:'',
      category:{
        title:"Java"
      }
    },
    {
      id:1,
      title:"Title 3",
      description:"Description 3 Description  Description  Description 1 Description ",
      maxMarks:"150",
      numberOfQuestions:"75",
      active:'',
      category:{
        title:"Angular"
      }
    },
    {
      id:1,
      title:"Title 4",
      description:"Description 4 Description Description Description Description",
      maxMarks:"50",
      numberOfQuestions:"50",
      active:'',
      category:{
        title:"Java"
      }
    },
    {
      id:1,
      title:"Title 5",
      description:"Description 5 Description 5 Description 5 Description 5 Description ",
      maxMarks:"40",
      numberOfQuestions:"40",
      active:'',
      category:{
        title:"Python"
      }
    }
  ];
  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe(
      (data:any)=>{
        this.quizzes = data;
        
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!","Error in loading data","error");
      }
    );
  }

}

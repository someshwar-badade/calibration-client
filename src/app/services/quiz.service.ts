import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public getQuizzes(){
   return  this.http.get(`${baseUrl}/quiz`);
  }

  public addQuiz(quiz){
    return this.http.post(`${baseUrl}/quiz`,quiz);
  }
}

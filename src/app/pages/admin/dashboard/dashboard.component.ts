import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private isDark =false;
  constructor(@Inject(DOCUMENT) private document:Document, private renderer:Renderer2) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('theme'));
    this.isDark = localStorage.getItem('theme')==='dark'?true:false;
   // this.renderer.setAttribute(this.document.body,'class',localStorage.getItem('theme'));
  }

  switchMode(theme){
    
    const hostClass = theme +' mat-app-background';
    this.renderer.setAttribute(this.document.body,'class',hostClass);
    localStorage.setItem('theme',theme);
    console.log(localStorage.getItem('theme'));
  }

  // @HostBinding('class')
  // get themeMode(){
  //   return this.isDark?'theme-dark':'';
  // }
}

import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'calibration';

  // private isDark =true;

  // constructor(@Inject(DOCUMENT) private document:Document,private renderer:Renderer2){}
  ngOnInit(){
    // this.renderer.setAttribute(this.document.body,'class','theme-light');
  }
  // switchMode(isDarkmode:boolean){
  //   const hostClass = isDarkmode?'theme-dark':'theme-light';
  //   this.renderer.setAttribute(this.document.body,'class',hostClass);
  // }
  // @HostBinding('class')
  // get themeMode(){
  //   return this.isDark?'theme-dark':'theme-light';
  // }
}

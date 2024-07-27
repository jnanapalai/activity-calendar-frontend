import { Component } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-welcomeactivity',
  templateUrl: './welcomeactivity.component.html',
  styleUrl: './welcomeactivity.component.css'
})
export class WelcomeactivityComponent {
  isVisible = true;

  constructor(private router: Router) {
       router.events.subscribe(data=> {
        if(data instanceof NavigationEnd) {
          if(data.url.includes("showcalendar")) {
            this.isVisible = false;
          } else {
            this.isVisible = true;
          }
        }
       })
  }
   
  images = [
    {
      imgSrc: 'assets/images/calendar.png',
      imgAlt: 'calendar'
    },
    {
      imgSrc: 'assets/images/selectdate.png',
      imgAlt: 'dateclick'
    },
    {
      imgSrc: 'assets/images/createactivity.png',
      imgAlt: 'createactivity'
    },
    {
      imgSrc: 'assets/images/submitactivity.png',
      imgAlt: 'submitactivity'
    },
    {
      imgSrc: 'assets/images/showactivity.png',
      imgAlt: 'showactivity'
    },
    {
      imgSrc: 'assets/images/showcountactivity.png',
      imgAlt: 'showcountactivity'
    }
  ]

  goToShowCalendar() {
    this.isVisible = false;
    this.router.navigate(["/showcalendar"]);
  }
   
}

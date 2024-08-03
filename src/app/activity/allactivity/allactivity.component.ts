import { Component, Input, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import {style, state, animate, transition, trigger} from '@angular/animations';
import { Activitycount } from '../../model/activitycount';

@Component({
  selector: 'app-allactivity',
  templateUrl: './allactivity.component.html',
  styleUrl: './allactivity.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(2000, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(2000, style({opacity:0})) 
      ])
    ])
  ]
})
export class AllactivityComponent implements OnInit {

  @Input('inputFromApp') clickedDate: any;
  @Input('inputMonths') months:any;
  @Input('inputAllActivityCount') allActivityCount:any;

  showActivityComponent = false;
  createActivityComponent = false;

  ngOnInit(): void {
    console.log("Getting all activity count from showcaledar", this.allActivityCount)
    this.loadShowActivityComponent();
  }

  loadShowActivityComponent() {
    this.showActivityComponent = true;
    this.createActivityComponent = false;
  }

  loadCreateActivityComponent() {
    this.createActivityComponent = true;
    this.showActivityComponent = false;
  }

  loadMainActivity(clickedDate: any) {
    let currentMonthIndex = this.getMonth(clickedDate)-1;
    this.months[currentMonthIndex].active=true;
    this.createActivityComponent = false;
    this.showActivityComponent = false;
  }

  getMonth(clickedDate: any) {
     return parseInt(clickedDate.split("/")[1]);
  }
}

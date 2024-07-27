import { Component, OnInit, Input } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../model/activity';
import {style, animate, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-showactivity',
  templateUrl: './showactivity.component.html',
  styleUrl: './showactivity.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(200, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(200, style({opacity:0})) 
      ])
    ])
  ]
  
})
export class ShowactivityComponent implements OnInit {

  activityList!: Activity[];
  isOpen : boolean = false;
  currentIndex:number = -1;
  assignedCount:number=0;
  completedCount:number=0;

  isSuccess!:boolean;
  isError!:boolean;
  responseMessage!:string;


  @Input('inputFromAllActivity') clickedDate: any;

  constructor(private activityService: ActivityService) {}

  getPendingActivities  = () => {
    return this.activityList.filter(act => {
      return act.activityStatus === 'ASSIGNED'
    }).length;
  }

  getCompletedActivities  = () => {
    return this.activityList.filter(act => {
      return act.activityStatus === 'FINISHED'
    }).length;
  }

  ngOnInit(): void {
    console.log("The data for clicked date fetched from app activity is", this.clickedDate);
    this.activityService.getListActivitiesByDate(this.getDate())
    .subscribe(data=> {
      this.activityList = data;
    })
  }

  completeActivity(activityId : number, event: Event) {
    this.activityService.completeActivity(activityId).subscribe(data => {
      this.activityList = this.activityList.map(activity=> {
         if(activity.activityId === activityId) {
          return {...activity, activityStatus: 'FINISHED' }
         }
         return activity;
      })
      this.responseMessage = "Activity Saved Successfully";
      this.isSuccess=true;
      setTimeout(() => {
        this.isSuccess = false;
    }, 3000);
    },error=> {
      console.log("error is ", error);
      this.responseMessage = error.statusText;
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
    }, 3000);
    });
    event.stopPropagation();
  }

  removeActivity(activityId: number, event: Event){
    this.activityService.deleteActivity(activityId).subscribe(data => {
      this.activityList = this.activityList.filter(activity => {
        return activity.activityId !== activityId
      })
      this.responseMessage ="Activity Removed Successfully";
      this.isSuccess= true;
      setTimeout(() => {
        this.isSuccess = false;
    }, 3000);
    }, error=> {
    
      this.responseMessage = error.statusText;
      this.isError=true;
      setTimeout(() => {
        this.isError = false;
    }, 3000);
    });
    event.stopPropagation();
  }

  

  toggle(index: number) {
    if(this.currentIndex === index) {
       this.currentIndex = -1;
      return;
    }
    this.currentIndex = index;
  }
  
  getDate() {
    if(this.clickedDate.split("/")[0].toString().length==1) {
      return "0"+this.clickedDate;
    } else {
      return this.clickedDate;
    }
  }

}

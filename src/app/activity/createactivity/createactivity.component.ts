import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivityService } from '../../services/activity.service';
import {style, state, animate, transition, trigger} from '@angular/animations';
import { Activitycount } from '../../model/activitycount';
import { DatePipe } from '@angular/common';
import { count } from 'rxjs';
import { User } from '../../model/user';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-createactivity',
  templateUrl: './createactivity.component.html',
  styleUrl: './createactivity.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(1000, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(1000, style({opacity:0})) 
      ])
    ])
  ]
})
export class CreateactivityComponent implements OnInit {
  @Input('inputFromAllActivity') clickedDate: any;
  @Input('inputForAllActivityCount') allActivityCount!:Activitycount[];

  loading:boolean = false;
  errorMessage!:String;
  isError!:boolean;
  isSuccess!: boolean;
  userList!: User[];
  isDateAllowedToCreate:boolean = true;
  userGroupOfLoggedInUser!: string;

  createActivityForm:any;
  constructor(private formBuilder: FormBuilder, 
    private activtiyService: ActivityService, 
    private authenticatioService: AuthenticationService
    
  ) {}

  ngOnInit(): void {
    this.userGroupOfLoggedInUser = this.authenticatioService.getUserGroup();
    if (this.userGroupOfLoggedInUser === 'Organisation') {
      this.activtiyService.getAllUsers().subscribe(data=>{
        console.log("All users are ", data);
        this.userList = data as User[];
      })
    }
    
    this.createActivityForm = this.formBuilder.group({
      activityDetails: ['',Validators.required],
      assignedFor: ['self'],
      assignedTo:[],
      description: ['',Validators.required],
      activityDate: [this.getDate()]
    } 
    )
    this.isDateAllowedToCreate = this.checkTodaysDateIsAfterActivitydate(this.getDate())
  }
  
  checkTodaysDateIsAfterActivitydate=(date: string): boolean => {
    const [day, month, year] = date.split("/").map(Number);
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    return (new Date(year, month-1,day ) >= todayDate)
  }

  resetAssignedTo = ()=> {
    this.createActivityForm.get('assignedTo').reset();
  }

  convertYearMonthDate(date: string): string {
    return date.split("/")[2]+"-"+date.split("/")[1]+"-"+date.split("/")[0];
  }

  onSubmit() {
    this.loading = true;
    this.activtiyService.createActivity(this.createActivityForm.value).subscribe(data=> {
      var theDate = this.convertYearMonthDate(this.createActivityForm.value.activityDate); 
       var getActivity = this.allActivityCount.filter(data => {
        return (new Date(data.activityDate).toISOString().split("T")[0] == theDate)
      });
      if (getActivity.length > 0) {
         getActivity[0].countTotal = getActivity[0].countTotal + 1;
      } else {
        this.allActivityCount.push({
          activityDate: new Date(theDate),
          countTotal: 1
        });
      }
      
      //this.allActivityCount[this.allActivityCount.length-1].activityDate = '2024-11-11';
      console.log("datasaved");
      this.isSuccess = true;
      this.loading = false;
      setTimeout(() => {
        this.isSuccess = false;
    }, 3000);

    }, error=>{
        console.log("error is", error)
        this.loading=false;
        this.isError = true;
        this.errorMessage = error.statusText;
        setTimeout(() => {
          this.isError = false;
      }, 3000);
        
    }, ()=> {
       this.loading=false;
       this.createActivityForm.get('activityDetails').reset();
       this.createActivityForm.get('description').reset();
    });
    //this.loading = false;
  }

  getDate() {
    if(this.clickedDate.split("/")[0].toString().length==1) {
      return "0"+this.clickedDate;
    } else {
      return this.clickedDate;
    }
  }


}

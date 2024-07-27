import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


import { ActivityService } from '../../services/activity.service';
import { Activitycount } from '../../model/activitycount';

@Component({
  selector: 'app-showcalendar',
  templateUrl: './showcalendar.component.html',
  styleUrl: './showcalendar.component.css'
})
export class ShowcalendarComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private activityService: ActivityService) {
    // router.events.subscribe(data=> {
    //   if(data instanceof NavigationEnd) {
    //     if(data.url === '/showcalendar') {
    //       this.isCalendarVisible = true;
    //     } else {
    //       this.isCalendarVisible = false;
    //     }
    //   }
    //  })

  }



  @Input("inputFromParent") isCalendarVisible: any;
  clickedDate="";
  title = 'activitycalendar';
  acitvityCount!:Activitycount[];
  dateButtonDisabled:boolean =  false;
  currentYear!:number;
  weekLoop = 6;
   months = [
    { month: "January",monthNumber:"01", days: 31, active: true },
    { month: "February",monthNumber:"02", days: this.currentYear % 4 == 0 ? 29 : 28 ,active: true },
    { month: "March",monthNumber:"03", days: 31,active: true },
    { month: "April",monthNumber:"04", days: 30, active: true },
    { month: "May",monthNumber:"05", days: 31, active: true },
    { month: "June",monthNumber:"06", days: 30, active: true },
    { month: "July",monthNumber:"07", days: 31, active: true },
    { month: "August",monthNumber:"08", days: 31, active: true },
    { month: "September",monthNumber:"09", days: 30, active: true },
    { month: "October",monthNumber:"10", days: 31, active: true },
    { month: "November",monthNumber:"11", days: 30, active: true },
    { month: "December",monthNumber:"12", days: 31, active: true },
  ];

  
  counter(count:number){
    return new Array(count);
  }

  createActivity(m: any, date: any) {
    this.months.forEach(month=> {
      month.active = true;
    })
    m.active = false;
    this.clickedDate = (date+1)+"/"+m.monthNumber+"/"+this.currentYear;
  }

  ngOnInit(): void {
    this.activityService.countListActivityByActivityDate()
    .subscribe(data=> {
      
      this.acitvityCount=data;
      console.log("activity count by date", this.acitvityCount);
    })
    this.getcurrentYear();
  }

  getcurrentYear() {
    var d = new Date();
    this.currentYear = d.getFullYear();
  }

  compareMonthAndDate(date: number, monthNumber: string): number {
       let dateWithMonthAndYear = this.currentYear+"-"+monthNumber+"-"+(date+1);
       if (!(this.acitvityCount === undefined)) {
        const filteredDate = this.acitvityCount.filter(data=> {
          return (data.activityDate.toString() == dateWithMonthAndYear)
         });
         if(filteredDate.length > 0) {
            return filteredDate[0].countTotal;
         } else {
          return 0;
         }
       }
     return 0;
  }

  checkDayAndDateMatch(date: number, monthNumber: string, dayWeek: number): boolean {
    let dateWithMonthAndYear = monthNumber+"-"+(date+1)+"-"+this.currentYear;
    var d = new Date(dateWithMonthAndYear);
    var day = d.getDay();
    return day === dayWeek;
  }
   
  getDayofWeek(date: number, monthNumber: string): number {
    let dateWithMonthAndYear = monthNumber+"-"+(date+1)+"-"+this.currentYear;
    var d = new Date(dateWithMonthAndYear);
    return d.getDay();
  }

  findNumberOfBlankDateInitial(monthNumber: string): number {
     let dateWithMonthAndYear = monthNumber+"-"+1+"-"+this.currentYear;
     var d = new Date(dateWithMonthAndYear);
     return d.getDay();
  }

  onNext() {
    this.months = this.months.map(month=> {
      return {...month, active:true}
    })
    this.currentYear = this.currentYear + 1;
  }

  onPrev() {
    this.months = this.months.map(month=> {
      return {...month, active:true}
    })
    this.currentYear = this.currentYear -1;
  }

  onLogOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    this.router.navigate([{ outlets: { outletcalendarpage: ['welcome'] } }]);
  }

}


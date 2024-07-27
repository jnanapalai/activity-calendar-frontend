import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivityService } from '../../services/activity.service';
import {style, state, animate, transition, trigger} from '@angular/animations';

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

  loading:boolean = false;
  errorMessage!:String;
  isError!:boolean;
  isSuccess!: boolean;

  createActivityForm:any;
  constructor(private formBuilder: FormBuilder, private activtiyService: ActivityService) {

  }

  ngOnInit(): void {
    this.createActivityForm = this.formBuilder.group({
      activityDetails: ['',Validators.required],
      description: ['',Validators.required],
      activityDate: [this.getDate()]
    } 
    )

  }

  onSubmit() {
    this.loading = true;
    this.activtiyService.createActivity(this.createActivityForm.value).subscribe(data=> {
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

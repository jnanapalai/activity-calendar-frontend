import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivityService } from '../../services/activity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit  {

  isSignUpEnabled = true;
  signUpForm:any;

  constructor(private formBuilder:FormBuilder, 
    private activityService:ActivityService, private router:Router){}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName: ['',Validators.required],
      userName:['',Validators.required],
      accountType:['',Validators.required],
      company:[''],
      email: ['',Validators.required],
      password:['',Validators.required],
      confirmpassword:['',Validators.required]
    })
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    this.activityService.createUser(this.signUpForm.value)
    .subscribe(
      {
        next: (data) => {
          console.log("data is" , data);
          this.signUpForm.reset();
          alert("User Registered successfully");
        },
        error: (e) => console.error("error is", e),
        complete: () => console.info('complete') 
      }
    
    );
  }




}

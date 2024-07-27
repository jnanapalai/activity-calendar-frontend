import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivityService } from '../../services/activity.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isLoginEnabled = true;
  loginForm:any;
  isLoginInvalid = false;
  loginErrorMessage = "Invalid user and password . Please try again";

  constructor(private formBuilder:FormBuilder, 
    private activityService:ActivityService, 
    private router: Router, private authService:AuthenticationService){}

  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
        userNameOrEmail:['',Validators.required],
        password:['', Validators.required]
    })
    
  }

  onSubmit() {
    this.authService.authenticate(this.loginForm.value.userNameOrEmail, 
      this.loginForm.value.password).subscribe({
        next: (data) => {
          console.log("data is" , data)
          this.router.navigate([{ outlets: { outletcalendarpage: ['showcalendar'] } }])
          sessionStorage.setItem('username', this.loginForm.value.userNameOrEmail);
          //sessionStorage.setItem('password', this.loginForm.value.password);
          sessionStorage.setItem('token', 'Bearer '+data)
          this.isLoginInvalid = false;
        },
        error: (e) => {
          console.error("error is", e)
          this.isLoginInvalid=true;
          setTimeout(() => {
            this.isLoginInvalid = false;
        }, 5000);
        },
        complete: () => console.info('complete') 
      });
  }
}

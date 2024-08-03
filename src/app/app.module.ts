import { APP_INITIALIZER, Component, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CreateactivityComponent } from './activity/createactivity/createactivity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { mapToCanActivate, mapToCanActivateChild, RouterModule } from '@angular/router';
import { ShowactivityComponent } from './activity/showactivity/showactivity.component';
import { AllactivityComponent } from './activity/allactivity/allactivity.component';
import { HTTP_INTERCEPTORS, HttpClientModule, withInterceptors } from '@angular/common/http';
import { MonthcalendarComponent } from './activity/monthcalendar/monthcalendar.component';
import { WelcomeactivityComponent } from './activity/welcomeactivity/welcomeactivity.component';
import { ShowcalendarComponent } from './activity/showcalendar/showcalendar.component';
import { SummarysliderComponent } from './activity/summaryslider/summaryslider.component';
import { SignupComponent } from './activity/signup/signup.component';
import { LoginComponent } from './activity/login/login.component';
import { RequestinterceptorService } from './services/requestinterceptor.service';
import { OAuthModule } from 'angular-oauth2-oidc';




const routes = [
  
  {path:"createActivity",component:CreateactivityComponent},
  {path:"welcome", component: WelcomeactivityComponent, 
    outlet: 'outletcalendarpage'},
  {path:"showcalendar",
   component: ShowcalendarComponent, 
   outlet: 'outletcalendarpage'
  },
  {path:"login", component: LoginComponent, outlet: 'outletwelcomepage'},
  {path:"signup", component: SignupComponent, outlet: 'outletwelcomepage'},

]

@NgModule({
  declarations: [
    AppComponent,
    CreateactivityComponent,
    ShowactivityComponent,
    AllactivityComponent,
    MonthcalendarComponent,
    WelcomeactivityComponent,
    ShowcalendarComponent,
    SummarysliderComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HammerModule,
    OAuthModule.forRoot()
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide:HTTP_INTERCEPTORS,
      useClass:RequestinterceptorService, multi:true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

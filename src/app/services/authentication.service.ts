import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authconfig } from './auth.config';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  

  constructor(private httpClient: HttpClient, private oauthService: OAuthService) {
    this.configure();

   }

   private configure() {
    this.oauthService.configure(authconfig)
    this.oauthService.loadDiscoveryDocumentAndTryLogin(); // This method is trigger issuer uri
    
  }

  // authenticate(userNameOrEmail: string,password: string) {
  //   const params = new HttpParams()
  //   .set('username', userNameOrEmail)
  //   .set('password', password);
  //   let jsonString = {"username":userNameOrEmail,"password":password}
  //   //return this.httpClient.post("/api/validateuser",null,{params} )
  //    return this.httpClient.post("/api/authenticate",jsonString,{responseType: "text"});
  // }

  authenticate() {
    this.oauthService.initCodeFlow();
  }

  hasValidAccessToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  logOut() {
    this.oauthService.logOut();
  }

  isUserLoggeIn() {
    let user = sessionStorage.getItem("username");
    console.log(!(user === null))
    return !(user === null)
  }

  getaccessToken():Observable<string> {
    return from(this.oauthService.getAccessToken());
  }


}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { authconfig } from './auth.config';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class RequestinterceptorService implements HttpInterceptor {

  constructor(private oauthService: OAuthService) { 
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authconfig)
    this.oauthService.loadDiscoveryDocumentAndTryLogin(); // This method is trigger issuer uri
    this.oauthService.setupAutomaticSilentRefresh();
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //if(sessionStorage.getItem('token')) {
    if(this.oauthService.hasValidAccessToken()) {
      req = req.clone({
        //setHeaders: {Authorization: ''+ sessionStorage.getItem('token')}
        //'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
        setHeaders: {Authorization: 'Bearer '+ this.oauthService.getAccessToken()}
      })
   }
  // // this.authService.getaccessToken().subscribe((accessToken) => {
  // //         req = req.clone({
  // //       //setHeaders: {Authorization: ''+ sessionStorage.getItem('token')}
  // //       //'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
  // //       setHeaders: {Authorization: 'Bearer '+ accessToken}
  // //     })
  // // })
      return next.handle(req);
   }
}

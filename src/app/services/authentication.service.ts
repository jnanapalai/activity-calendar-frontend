import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  

  constructor(private httpClient: HttpClient) {

   }

  authenticate(userNameOrEmail: string,password: string) {
    const params = new HttpParams()
    .set('username', userNameOrEmail)
    .set('password', password);
    let jsonString = {"username":userNameOrEmail,"password":password}
    //return this.httpClient.post("/api/validateuser",null,{params} )
     return this.httpClient.post("/api/authenticate",jsonString,{responseType: "text"});
  }

  isUserLoggeIn() {
    let user = sessionStorage.getItem("username");
    console.log(!(user === null))
    return !(user === null)
  }
}

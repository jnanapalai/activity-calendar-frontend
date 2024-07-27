import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Activity } from '../model/activity';
import { Activitycount } from '../model/activitycount';

@Injectable({
  providedIn: 'root'
})
export class ActivityService  {

  
  constructor(private httpCleint: HttpClient) { }

  createUser(userData:any){
    return this.httpCleint.post("/api/user", userData);
  }

 


  validateUser(userNameOrEmail:string,password:string ){
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(userNameOrEmail + ':' + password) });
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers.append("X-Requested-With", "XMLHttpRequest");
    // //const reqOp = new ({ headers: headers, withCredentials: true });
    // let params = new HttpParams().set("userNameOrEmail", userNameOrEmail)
    //              .set("password",password);

    //              let urlSearchParams = new URLSearchParams();
    //              urlSearchParams.append('username',userNameOrEmail );
    //              urlSearchParams.append('password', password );             
    // return this.httpCleint.get("/api/validateuser", {headers:headers})



    //postcall
    const params = new HttpParams()
                    .set('username', userNameOrEmail)
                    .set('password', password);

    return this.httpCleint.post("/api/validateuser",null,{params} )
  }

  getListOfActivities() {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') 
    // + ':' + sessionStorage.getItem('password')) });
    // const headers = new HttpHeaders({ Authorization: '' +sessionStorage.getItem('token') });
    return this.httpCleint.get<Activity[]>("/api/activity");  
  }

  getListActivitiesByDate(clickedDate: any) {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') 
    // + ':' + sessionStorage.getItem('password')) });
    // const headers = new HttpHeaders({ Authorization: '' +sessionStorage.getItem('token') });
    let params = new HttpParams().set('activityDate', clickedDate);
    return this.httpCleint.get<Activity[]>("/api/activity", {params: params});
  }

  createActivity(activity: Activity) {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') 
    // + ':' + sessionStorage.getItem('password')) });
    const headers = new HttpHeaders({ Authorization: '' +sessionStorage.getItem('token') });
    return this.httpCleint.post("/api/activity", activity);
    
  }

  countListActivityByActivityDate() {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') 
    // + ':' + sessionStorage.getItem('password')) });
    const headers = new HttpHeaders({ Authorization: '' +sessionStorage.getItem('token') });
    return this.httpCleint.get<Activitycount[]>("/api/activity/count");
  }

  completeActivity(activityId: number) {
    let params = new HttpParams
    return this.httpCleint.patch('/api/activity/'+activityId+'/complete','');       
  }

  deleteActivity(activityId: number) {
    return this.httpCleint.delete("/api/activity/"+activityId);
  }

}

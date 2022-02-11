import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http'
import { FormGroup } from '@angular/forms';
import {URLS} from '../app-url.constant'
import{BehaviorSubject, Observable,throwError} from 'rxjs'
import { catchError ,tap, map, share} from 'rxjs/operators';


// import 'rxjs/add/operator/catch'
// import 'rxjs/add/operator/throw';

@Injectable({
  providedIn: 'root'
})
export class CoreServicesService {
  // userurl ="http://3.0.136.135:1117/api/v1.0/user"
  // role = "http://localhost:3000/user"
  public currentUser$: BehaviorSubject<any> = new BehaviorSubject(this.hasToken()); // initial state is "null" => user is not logged in
  public isSignedIn$: Observable<boolean> = this.currentUser$.pipe(map(user => Boolean(user)),share());


  constructor(private http : HttpClient) { }

  private hasToken() : boolean {
    return !!sessionStorage.getItem('jwt');
  }

  
  // getcountry(){
  //   let httpHeader = new HttpHeaders({
  //     // "Authorization": `Bearer ${token}`,
  //     // "Content-Type": "application/json",
  //     // 'Access-Control-Allow-Origin': '*',
  //     // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  //     // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'

  //   })
  //   return this.http.get(URLS.GetCountry)
  // }


  login(data):Observable<any>{
    let httpHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<any>(URLS.login,data,{headers:httpHeader}).pipe(catchError(this.handleError), tap((res: any) => {
      localStorage.setItem('jwt',res.token)
      sessionStorage.setItem('jwt',res.token)
      this.currentUser$.next(res); // will automatically trigger the logged-in state as well 
    }));

  }
  // errorHandeler(error: HttpErrorResponse){
  //   return Observable.throw(error.message || "server Error");
  // }
  logout(){
        localStorage.clear();
        sessionStorage.clear();
        this.currentUser$.next(null); // will automatically trigger the logged-in state as well 
     
  }
  handleError(error){
    return throwError(error) 
  }

  saveuserList(data):Observable<any>{
    let httpParam = new HttpParams({
      // fromString :`?key=${supervisor}`
             fromString :`key=supervisor`

    })
  
    let httpHeader = new HttpHeaders({
      // "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    })
let role_type;
    
      if (data.roleId == 1) {
        role_type = 'CAT'
      }else if(data.roleId ==2) {
        role_type = 'SUBCAT'
      }else if(data.roleId==3){
        role_type='HUNTER'
      }
      else if(data.roleId==4){
        role_type='MAM'
      }
      let createdby = localStorage.getItem('userId')

    let data1={
      "firstName": data.firstName,
      "lastName": data.lastName,
      "address1": data.address1,
      "address2": data.address2,
      "country": data.country,
      "createdBy": createdby,
      // "created_by": data.created_by,
      "date_of_birth": data.date_of_birth,
      "emailId": data.emailId,
      "gender": data.gender,
      "mobileNo": data.mobileNo,
      "roleId": data.roleId,
      "roleType": role_type,
      "tradingPlan":{
        
        "total_max_percentage_risk": data.total_max_percentage_risk,
        "initial_investment": data.initial_investment,
        "estimated_trading_range": data.estimated_trading_range,
        "frequency_of_signal": data.frequency_of_signal,
        "risk_or_reward": data.risk_or_reward,
        "risk_percentage_order": data.risk_percentage_order,
        "estimated_win_loss_period": data.estimated_win_loss_period,
        "created_by": data.created_by,
        "updated_by": data.updated_by,
        "created_date": data.created_date,
        "updated_date": data.updated_date,
        "status": data.status      }
      }
console.log(data1);

    return this.http.post<any>(URLS.signup,data1,{headers:httpHeader,params:httpParam}).pipe(catchError(this.handleError))
    
  }


  saveuserListItself(data):Observable<any>{
     let httpParam = new HttpParams({
  
     })
        let data1={
          "firstName": data.firstName,
          "lastName": data.lastName,
          "address": data.address,
          "country": 'USA',
          "username": data.username,
          "password": "test@123",
          "phoneNo": data.phoneNo,
          
          }
    // console.log(data1);
          
        //code to activate container
        // let token = localStorage.getItem('jwt')
        // let httpHeader = new HttpHeaders({
        // "Authorization": `Bearer ${token}`,
        // "Content-Type": "application/json",
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        // })
        // let container_activate = this.http.get<any>('http://18.215.193.111:82/cgi-bin/start.py?',{headers:httpHeader}).pipe(catchError(this.handleError));
        
        //code to copy bot
        
        // let clone_bot = this.http.get<any>('http://18.215.193.111:82/cgi-bin/bot_copy.py?y='+data.firstName+'_bot.py',{headers:httpHeader}).pipe(catchError(this.handleError));
        
        return this.http.post<any>(URLS.signup,data1,{params:httpParam}).pipe(catchError(this.handleError))
        
  }

  activateContainer():Observable<any>{
    let httpParam = new HttpParams({
 
    })
   // console.log(data1);
         
       //code to activate container
       // let token = localStorage.getItem('jwt')
       let httpHeader = new HttpHeaders({
       // "Authorization": `Bearer ${token}`,
       "Content-Type": "application/json",
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
       'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
       })
      //  let container_activate = this.http.get<any>('http://18.215.193.111:82/cgi-bin/start.py?',{headers:httpHeader}).pipe(catchError(this.handleError));
       
       //code to copy bot
       
      //  let clone_bot = this.http.get<any>('http://18.215.193.111:82/cgi-bin/bot_copy.py?y='+data.firstName+'_bot.py',{headers:httpHeader}).pipe(catchError(this.handleError));
       
       return this.http.get<any>('http://18.215.193.111:82/cgi-bin/start.py?',{}).pipe(catchError(this.handleError))
       
 }

 cloneBot(data):Observable<any>{
  let httpParam = new HttpParams({

  })
 // console.log(data1);
       
     //code to activate container
     // let token = localStorage.getItem('jwt')
     let httpHeader = new HttpHeaders({
     // "Authorization": `Bearer ${token}`,
     "Content-Type": "application/json",
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
     })
    //  let container_activate = this.http.get<any>('http://18.215.193.111:82/cgi-bin/start.py?',{headers:httpHeader}).pipe(catchError(this.handleError));
     
     //code to copy bot
     
    //  let clone_bot = this.http.get<any>('http://18.215.193.111:82/cgi-bin/bot_copy.py?y='+data.firstName+'_bot.py',{headers:httpHeader}).pipe(catchError(this.handleError));
     
     return this.http.get<any>('http://18.215.193.111:82/cgi-bin/bot_copy.py?y='+data.firstName+'_bot.py',{}).pipe(catchError(this.handleError))
     
}

  changePassword(data,token):Observable<any>{
    let httpHeader = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    })
    return this.http.put<any>(URLS.changePassword,data,{headers:httpHeader}).pipe(catchError(this.handleError))
  }

  // forgotPassword(data){
  //  return this.http.post(URLS.forgotPassword,data)
  // }

  forgotPassword(data):Observable<any>{
    // return this.http.get(URLS.forgotPassword,data)
    return this.http.post<any>(URLS.forgotPassword+`?email=${data}`,'').pipe(catchError(this.handleError))
  }

  //*********** */ admin-user-list part End************
  

//******** */ for confirm pssword part start**************

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  //******** */ for confirm pssword part End**************

  createAssignment(data):Observable<any>{
    let token = localStorage.getItem('jwt')
    let created_by = localStorage.getItem('userId')
    let httpHeader = new HttpHeaders({
       "Authorization": `Bearer ${token}`,
       "Content-Type": "application/json",
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
       'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'

    })
    let data1={
      "createdBy": created_by,
      "assignedUser":data.assignedUser,
      "assignmentDescription":data.assignmentDescription,
      "assignmentName":data.assignmentName
    }
    return this.http.post<any>(URLS.CreateAssignment,data1,{headers:httpHeader}).pipe(catchError(this.handleError))
  }
  getteamlist(id){
    let token = localStorage.getItem('jwt')
    let httpHeader = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'

    })
    // return this.http.get(URLS.getalluser,{headers:httpHeader})
    return this.http.get(`${URLS.GetTeamUser}/${id}`,{headers:httpHeader})
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URLS} from '../app/app-url.constant'
import{Observable,throwError} from 'rxjs'
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from 'src/app/error-handling.service'

@Injectable({
  providedIn: 'root'
})
export class FirstService {       
  

  constructor( private http:HttpClient) { }

  // ******** kyc part start here ********
  
  savekyc(user_id,formData,Userdata, accountData, thirdData):Observable<any>{
    let token = localStorage.getItem('jwt')
    let name=localStorage.getItem('userName')
    let address=localStorage.getItem('address')
    let httpHeader = new HttpHeaders({
    "Authorization": `Bearer ${token}`,
    // "Content-Type": "application/json"
    })
   let roletype = localStorage.getItem('userRoleType')
var data;
   if(roletype=='SUBCAT' ){
     data={
      "idCardNumber":Userdata.idCardNumber,
      "bankAccountNumber":Userdata.bankAccountNumber,
      "userId":user_id,
      "name":name,
      "occupation":Userdata.occupation,
      "address":address,
      "userAccount":accountData.userAccount,
      "forecast_course":thirdData.forecast_course,
      "manager_account_balance" : thirdData.manager_account_balance,
      "number_of_manager_inside_him" : thirdData.number_of_manager_inside_him,
      "frequency_of_trade" : thirdData.frequency_of_trade,
    }

   } else if(roletype=='HUNTER'){
     data={
      "idCardNumber":Userdata.idCardNumber,
      "bankAccountNumber":Userdata.bankAccountNumber,
      "userId":user_id,
      "name":name,
      "occupation":Userdata.occupation,
      "address":address,
      "userAccount":accountData.userAccount,
      "forecast_course":thirdData.forecast_course,
      "manager_account_balance" : thirdData.manager_account_balance,
      "number_of_manager_inside_him_hunter" : thirdData.number_of_manager_inside_him,
      "frequency_of_trade_hunter" : thirdData.frequency_of_trade,
     }
  
  
    }

    

    let data2 = JSON.stringify(data);
    // for ( var key in data1 ) {
      formData.append("kycMapper", data2);
      console.log(formData);
      
      return this.http.post<any>(URLS.saveKycList,formData,{headers:httpHeader}).pipe(catchError(this.handleError))
    
  } 


  getkycbyid(id):Observable<any>{
    return this.http.get<any>(`${URLS.saveKycList}/${id}`).pipe(catchError(this.handleError))
    // return this.http.get(`${URLS.saveKycList}/${id}`)
    
  }
  
  getkyc():Observable<any>{
    let token = localStorage.getItem('jwt')
    let httpHeader = new HttpHeaders({
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    })
    return this.http.get<any>(URLS.saveKycList,{headers:httpHeader}).pipe(catchError(this.handleError))
    // return this.http.get(URLS.getKycList)
    
  }
updatePassword(id,userEmail,checkUserFirstTimelogin,formData):Observable<any>{

  let data = {
    "changePassword": formData.changePassword,
    "confPassword": formData.confPassword,
    "currentPassword": formData.currentPassword,
    "emailId":userEmail,
    "userId": id,
    // "checkUserFirstTimelogin":checkUserFirstTimelogin
  }
  let token = localStorage.getItem('jwt')
  let httpHeader = new HttpHeaders({
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  })
return this.http.put<any>(URLS.changePassword,data,{headers:httpHeader})
.pipe(catchError(this.handleError))
}
handleError(error){
  return throwError(error) 
}
 
}
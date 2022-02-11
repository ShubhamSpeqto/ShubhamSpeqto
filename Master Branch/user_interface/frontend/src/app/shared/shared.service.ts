import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URLS} from '../../app/app-url.constant'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }
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

  getuserlist(){
    let token = localStorage.getItem('jwt')
    let httpHeader = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'

    })
    return this.http.get(URLS.getalluser,{headers:httpHeader})
    
  }
  
  getkyc(){
    let token = localStorage.getItem('jwt')
    let httpHeader = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    })
    return this.http.post(URLS.getkyclist,{"status":"all"},{headers:httpHeader})

    
  }

  getkycbyid(id1){
    let token = localStorage.getItem('jwt')
    let httpHeader = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    })
    return this.http.get(`${URLS.getKycListById}/${id1}`,{headers:httpHeader})
    // return this.http.get(`${URLS.saveKycList}/${id}`)
    
  }
  userupdatekyc(kyc_id,status){
    let data={ "status":status}
    let token = localStorage.getItem('jwt')
    let httpHeader = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    })
    return this.http.put(`${URLS.updateUserKyc}/${kyc_id}`,data,{headers:httpHeader})
  }
  // getuserlistbyID(id){
  //   let token = localStorage.getItem('jwt')
  //   // console.log(id);
  //   let httpHeader = new HttpHeaders({
  //     "Authorization": `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  //     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  //   })
    
  //   return this.http.get(`${URLS.getUserListById}/${id}`,{headers:httpHeader})
  // }
  updateuserbyid(id,data){
    let token = localStorage.getItem('jwt')
    let httpHeader = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    })
    return this.http.put(`${URLS.updateuserlistbyid}/${id}`,data,{headers:httpHeader})
  }

  useractivate(token,emailId){
    return this.http.get(URLS.userActivate+`/token=${token}/emailId=${emailId}`)
  }
  useractivatelink(token,emailId){
    return this.http.get(URLS.useractivatinglink+`/${token}/${emailId}`)
  }

  AssignmentList(){
    let userID = localStorage.getItem('userId')
    let token = localStorage.getItem('jwt')
    let httpHeader = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    })

    
    return this.http.get(URLS.assignmentlist+`/${userID}?fetchFor=createdBy`,{headers:httpHeader})
  }
  asignmentlistbyid(id){
    let token = localStorage.getItem('jwt')
    let httpHeader = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    })

    return this.http.get(URLS.assignmentlistById+`/${id}`,{headers:httpHeader})
  }

}

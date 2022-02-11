import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '../app-url.constant';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http:HttpClient) { }

  getUser(userId, jwt){
    let httpHeader = new HttpHeaders({
      "Authorization": 'Bearer '+jwt,
    })
    return this.http.get(URLS.getUserById+"/"+userId,{headers:httpHeader});
  }
}

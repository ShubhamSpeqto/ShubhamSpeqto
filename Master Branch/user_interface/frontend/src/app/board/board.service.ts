import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '../app-url.constant';

@Injectable({
  providedIn: 'root'
})
export class BoardInfoService {

  constructor(private http:HttpClient) { }

  getAccount(account, jwt){
    let httpHeader = new HttpHeaders({
      "Authorization": 'Bearer '+jwt,
    })
    return this.http.get(URLS.getOandaAccount+""+account,{headers:httpHeader});
  }

  getTrades(account, jwt){
    let httpHeader = new HttpHeaders({
      "Authorization": 'Bearer '+jwt,
    })
    return this.http.get(URLS.getOandaAccount+""+account+"/openTrades",{headers:httpHeader});
  }

  getorders(account, jwt){
    let httpHeader = new HttpHeaders({
      "Authorization": 'Bearer '+jwt,
    })
    return this.http.get(URLS.getOandaAccount+""+account+"/pendingOrders",{headers:httpHeader});
  }

  getPosition(account, jwt){
    let httpHeader = new HttpHeaders({
      "Authorization": 'Bearer '+jwt,
    })
    return this.http.get(URLS.getOandaAccount+""+account+"/openPositions",{headers:httpHeader});
  }
}

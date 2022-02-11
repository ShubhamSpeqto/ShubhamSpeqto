import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URLS} from '../../app/app-url.constant'

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http:HttpClient) { }

  savecatsingal(id,formdata){
    let data={
      chart:formdata.chart,
      entry:formdata.entry,
      pip:formdata.pip,
      price:formdata.price,
      type:formdata.type,
      zone:formdata.zone,
      symbol:formdata.symbol,
      comment:formdata.comment,
      userId:id

    }
    return this.http.put(URLS.SaveCatSignal,data)

  }
}

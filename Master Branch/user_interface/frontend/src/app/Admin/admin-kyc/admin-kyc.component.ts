import { Component, OnInit } from '@angular/core';
import {FirstService} from '../../first.service'

@Component({
  selector: 'app-admin-kyc',
  templateUrl: './admin-kyc.component.html',
  styleUrls: ['./admin-kyc.component.css']
})
export class AdminKycComponent implements OnInit {
  

  constructor(private first:FirstService) { }

  collection={}
  ngOnInit() {
    
    this.kyc()
     
  }

  kyc(){
    this.first.getkyc().subscribe((result)=>{
      console.warn(result);
      this.collection = result;
    })
  }
  approve(id){
    alert(id)
  }

  approve12(id){
    this.first.getkycbyid(id).subscribe((result)=>{
      console.warn(result);})
      // this.collection =  result;

  }

  disapprove(id){
    alert(id)
  }

}

import { Component, OnInit } from '@angular/core';
import { OrderEngineService } from './order-engine.service';
import {FormControl} from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-order-engine',
  templateUrl: './order-engine.component.html',
  styleUrls: ['./order-engine.component.scss']
})
export class OrderEngineComponent implements OnInit {
  country: string;
  phoneNo: string;
  userId: string;
  userName: string;
  address: string;
  jwt: string;
  firstName: string;
  lastName: string;

  toppings = new FormControl();

  toppingList: string[] = ['AUD_USD', 'AUD_SGD', 'AUD_CAD', 'AUD_CHF', 'AUD_HKD', 'AUD_JPY', 'AUD_NZD', 'CAD_CHF', 'CAD_HKD', 'CAD_JPY', 'CAD_SGD', 'CHF_HKD', 'CHF_JPY', 'CHF_ZAR', 'EUR_AUD', 'EUR_CAD', 'EUR_CHF', 'EUR_CZK', 'EUR_DKK', 'EUR_GBP', 'EUR_HKD', 'EUR_HUF', 'EUR_JPY', 'EUR_NOK', 'EUR_NZD', 'EUR_PLN', 'EUR_SEK', 'EUR_SGD', 'EUR_TRY', 'EUR_USD', 'EUR_ZAR', 'GBP_AUD', 'GBP_CAD', 'GBP_CHF', 'GBP_HKD', 'GBP_JPY', 'GBP_NZD', 'GBP_PLN', 'GBP_SGD', 'GBP_USD', 'GBP_ZAR', 'HKD_JPY', 'NZD_CAD', 'NZD_CHF', 'NZD_HKD', 'NZD_JPY', 'NZD_SGD', 'NZD_USD', 'SGD_CHF', 'SGD_HKD', 'SGD_JPY', 'TRY_JPY', 'USD_CAD', 'USD_CHF', 'USD_CNH', 'USD_CZK', 'USD_DKK', 'USD_HKD', 'USD_HUF', 'USD_INR', 'USD_JPY', 'USD_MXN', 'USD_NOK', 'USD_PLN', 'USD_SAR', 'USD_SEK', 'USD_SGD', 'USD_THB', 'USD_TRY', 'USD_ZAR', 'ZAR_JPY'];

  foods: Food[] = [
    {value: 'S5', viewValue: 'S5'},
    {value: 'S10', viewValue: 'S10'},
    {value: 'S15', viewValue: 'S15'},
    {value: 'S30', viewValue: 'S30'},
    {value: 'M1', viewValue: 'M1'},
    {value: 'M2', viewValue: 'M2'},
    {value: 'M3', viewValue: 'M3'},
    {value: 'M4', viewValue: 'M4'},
    {value: 'M5', viewValue: 'M5'},
    {value: 'M10', viewValue: 'M10'},
    {value: 'M15', viewValue: 'M15'},
    {value: 'M30', viewValue: 'M30'},
    {value: 'H1', viewValue: 'H1'},
    {value: 'H2', viewValue: 'H2'},
    {value: 'H3', viewValue: 'H3'},
    {value: 'H4', viewValue: 'H4'},
    {value: 'H6', viewValue: 'H6'},
    {value: 'H8', viewValue: 'H8'},
    {value: 'H12', viewValue: 'H12'},
    {value: 'D', viewValue: 'D'},
    {value: 'W', viewValue: 'W'},
    {value: 'M', viewValue: 'M'},
  ];

  constructor(private userInfo:OrderEngineService,
    private fb : FormBuilder,private router : Router
    ){}




  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.jwt = localStorage.getItem('jwt');
    this.getuserProfile(this.userId, this.jwt);
  }

  OrderEngineForm = this.fb.group({
    assignedUser : ['',[Validators.required]],
    assignmentDescription : ['',[Validators.required]],
    assignmentName : ['',[Validators.required]],
    // createdBy : ['']

  })



getuserProfile(userId, jwt) {
  this.userInfo.getUser(userId, jwt).subscribe(
    (success: any) => {
      console.log(success);
      
      if(success.id){
        console.log(success)
        this.firstName = success.firstName;
        this.lastName =  success.lastName;
        this.userName = success.username;
        this.address = success.address;
        this.phoneNo = success.phoneNo;
        this.country = success.country;
        
      }
    }, (error: any) => {
      console.log(error)
    })
}

}

import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-user-kyc-list1',
  templateUrl: './user-kyc-list1.component.html',
  styleUrls: ['./user-kyc-list1.component.css']
})
export class UserKycList1Component implements OnInit {
  alert: boolean = false;
  collection : any = [];
  account: any;
  error:String
  
  

  constructor(private router : ActivatedRoute,
    private route : Router,
     private fb: FormBuilder,
     private sharedservice:SharedService) { }

  ngOnInit() {
    

  this.fun();

}
  userkyclistForm = this.fb.group({
    name: [''],
      occupation: [''],
      idCardNumber: [''],
      bankAccountNumber: [''],
      address: [''],
    
      
  })

  
  fun(){
    // console.warn(this.router.snapshot.params.user_id);
    this.sharedservice.getkycbyid(this.router.snapshot.params.kyc_id).subscribe((result) => {

      //  this.collection = result.userAccount.data;
       this.collection = result;
       this.account=this.collection.userAccount
       console.log(this.account)
       console.log(this.collection)

       this.userkyclistForm = this.fb.group({
         name: [result['name']],
           occupation: [result['occupation']],
           idCardNumber: [result['idCardNumber']],
           bankAccountNumber: [result['bankAccountNumber']],
           address: [result['address']],
     })
     
   },(error:any)=>{
    Swal.fire('',error.error.message,'error')

      console.log(error.error.error)
  }
    )
}


  onSubmit(status){
    console.warn("item",this.userkyclistForm.value);
    this.sharedservice.userupdatekyc(this.router.snapshot.params.kyc_id,status).subscribe((result)=>{
      console.warn("result",result);
      // this.alert=true
      this.successNotification()
      this.route.navigate(['dashboard/user-kyc-list'])
      
    },(error:any)=>{
      Swal.fire('',error.error.message,'error')

        console.log(error.error.error)
    })
  }
  onSubmit1(status){
    
    console.warn("item",this.userkyclistForm.value);
    this.sharedservice.userupdatekyc(this.router.snapshot.params.kyc_id,status).subscribe((result)=>{
      console.warn("result",result);
      
      this.disapprovenotification()
      this.route.navigate(['dashboard/user-kyc-list'])
      
    },(error:any)=>{
      Swal.fire('',error.error.message,'error')

        console.log(error.error.error)
    })
  }
  disapprovenotification(){
    Swal.fire('', 'This Kyc is dissapprove!', 'error')
  }
  successNotification(){
    Swal.fire('', 'This Kyc is successfully Approve!', 'success')
  }
  

  

}

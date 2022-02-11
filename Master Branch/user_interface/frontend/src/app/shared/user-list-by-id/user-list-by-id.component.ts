import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-user-list-by-id',
  templateUrl: './user-list-by-id.component.html',
  styleUrls: ['./user-list-by-id.component.css']
})
export class UserListByIdComponent implements OnInit {
  collection: any =[];
  collection1: any =[];
  

  constructor(private router : ActivatedRoute,
    private fb: FormBuilder,
    private sharedservice:SharedService) { }

  ngOnInit() {
    
    // this.fun();

  }

  userlistbyid = this.fb.group({
    emailId:[''],
    firstName: [''],
    lastName: [''],
    mobileNo: [''],
    address1: [''],
    address2:[''],
    country: [''],
    gender: [''],
    // created_by : [''],
     createdBy : [''],
    // roleId : [105],
    roleType : [],
    date_of_birth: [''],
    initial_investment: [''],
    total_max_percentage_risk : [''],
    estimated_trading_range : [''],
    frequency_of_signal : [''],
    
      
  })
  // fun(){
  //   this.sharedservice.getuserlistbyID(this.router.snapshot.params.userId).subscribe((result:any) => {

  //     this.collection = result;
  //     console.log(this.collection)

  //      this.userlistbyid = this.fb.group({
  //        firstName: result.data.firstName,
  //        lastName: result.data.lastName,
  //        emailId: result.data.emailId,
  //       mobileNo: result.data.mobileNo,
  //       address1: result.data.address1,
  //       address2: result.data.address2,
  //       country: result.data.country,
  //       gender: result.data.gender,
  //       roleType: result.data.roleType,
  //       createdBy: result.data.createdBy,
  //       date_of_birth: result.data.date_of_birth,
  //       initial_investment: result.data.tradingPlan.initial_investment,
  //       total_max_percentage_risk: result.data.tradingPlan.total_max_percentage_risk,
  //       estimated_trading_range: result.data.tradingPlan.estimated_trading_range,
  //       frequency_of_signal: result.data.tradingPlan.frequency_of_signal,
          
      
  
  //    })
  //  }
  //   )

  // }

  onSubmit(){
    console.warn("item",this.userlistbyid.value);
    this.sharedservice.updateuserbyid(this.router.snapshot.params.userId,this.userlistbyid.value).subscribe((result)=>{
      console.warn("result",result);
      // this.alert=true
      this.successnotification()
      
    })
  }

  userlist(){
    this.sharedservice.getuserlist().subscribe((result)=>{
      // console.log(result)
      this.collection1 = result;
      console.log(this.collection1);
      console.log(result);
      
        
    })
  }

  successnotification(){
    Swal.fire('','this data is Successfully Updated','success')
  }
}

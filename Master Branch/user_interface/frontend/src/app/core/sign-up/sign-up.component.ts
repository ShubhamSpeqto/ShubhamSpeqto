import { Component, OnInit } from '@angular/core';
import { CoreServicesService } from '../core-services.service';
import { FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import Swal from 'sweetalert2';
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbInputDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  model: NgbDateStruct;

  model1: string;
  model2: string;
  constructor(private coreServices: CoreServicesService,private fb:FormBuilder) { }
  alert : boolean = false
  loading : boolean = true
  error:String ;
  country1: any= []
  

   signupForm =this.fb.group({
    emailId:['',[Validators.required,Validators.pattern( '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    firstName: ['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
    lastName: ['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
    middleName: ['',[Validators.pattern('^[a-zA-Z]+$')]],
    mobileNo: ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    address1: ['',[Validators.required]],
    address2:[''],
    country: ['',[Validators.required]],
    gender: ['',[Validators.required]],
    // created_by : [''],
     createdBy : [''],
    roleId : [''],
    // roleType : ["Subcat"],
    date_of_birth: [''],
    initial_investment: [''],
    total_max_percentage_risk : [''],
    estimated_trading_range : [''],
    frequency_of_signal : [''],

    
    
    
  });
  

  ngOnInit() {
    // this.countryname()
   

  }
  
   //******** form validation error show area start ***************
   
   get firstName(){
     return this.signupForm.get('firstName')
   }
   get middleName(){
     return this.signupForm.get('middleName')
   }
   get lastName(){
     return this.signupForm.get('lastName')
   }
   get email(){
     return this.signupForm.get('emailId')
   }
   get dateofbirth(){
     return this.signupForm.get('date_of_birth')
   }
   get mobile(){
     return this.signupForm.get('mobileNo')
   }
   get address(){
     return this.signupForm.get('address1')
   }
   get country(){
     return this.signupForm.get('country')
   }
   get gender(){
     return this.signupForm.get('gender')
   }

   get initialInvestment(){
     return this.signupForm.get('initial_investment')
   }
   
   get totalmaxrisk(){
     return this.signupForm.get('total_max_percentage_risk')
   }
   get estimatetradingrange(){
     return this.signupForm.get('estimated_trading_range')
   }
   
   get frequencyoftrades(){
     return this.signupForm.get('frequency_of_signal')
   }
   
  
  // ******** form validation error show area End ****************

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.warn(this.signupForm.value);
    
    this.coreServices.saveuserList(this.signupForm.value).subscribe((result)=>{
      this.alert = true
      // this.loading = false;
      this.successnotification()
      
       this.signupForm.reset({})
    },(error:any)=>{
      Swal.fire('',error.error.message,'error')

        console.log(error.error.message)
    })
  }

  // countryname(){
  //   this.coreServices.getcountry().subscribe((result)=>{
  //     this.country1 = result;
  //   })
  // }
  closeAlert(){
    this.alert = false
  }
  cancel(){
    this.signupForm.reset({})

  }

  successnotification(){
    Swal.fire('success','Your data has been successfully','success');
  }
  
}

import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { CoreServicesService } from 'src/app/core/core-services.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';
import {
  NgbCalendar,
  NgbDate,
  NgbDateAdapter,
  NgbDateStruct,
  NgbInputDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-login-itself',
  templateUrl: './user-login-itself.component.html',
  styleUrls: ['./user-login-itself.component.css']
})
export class UserLoginItselfComponent implements OnInit {
  // model: NgbDateStruct;
  // myOptions: IAngularMyDpOptions = {
  //   dateRange: false,
  //   dateFormat: 'dd.mm.yyyy'
    
  // };
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }

  constructor(private coreServices: CoreServicesService
    ,private fb:FormBuilder,
    private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>
     ) {

      // config.minDate = {year: 1900, month: 1, day: 1};
      // config.maxDate = {year: 2099, month: 12, day: 31};
      // config.outsideDays = 'hidden';

    // weekends are disabled
    // config.markDisabled = (date: NgbDate) => calendar.getWeekday(date) >= 6;

    // setting datepicker popup to close only on click outside
    // config.autoClose = 'outside';

    // setting datepicker popup to open above the input
    // config.placement = ['top-left', 'top-right'];
      }
      get today() {
        return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
      }
     

  alert : boolean = false
  loading : boolean = true
  error:String
  country1:any=[]
  

   signupForm =this.fb.group({
    // username:['',[Validators.required,Validators.pattern( '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    username:['',[Validators.required]],
    firstName: ['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
    lastName: ['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
    // middleName:['',[Validators.pattern('^[a-zA-Z]+$')]],
    phoneNo: ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    address: ['',[Validators.required]],
    // address2:[''],
    // country: ['',[Validators.required]],
    // gender: ['',[Validators.required]],
    // roleId : [''],
    // date_of_birth: [''],
    // initial_investment: [''],
    // total_max_percentage_risk : [''],
    // estimated_trading_range : [''],
    // frequency_of_signal : [''],
    

  });

  ngOnInit() {
    // let model: IMyDateModel = {isRange: false, singleDate: {jsDate: new Date()}, dateRange: null};
    //  this.countryname()
    // this.coreServices.getcountry().subscribe((result)=>{
    //   this.country1 = result;
    //   console.log(this.country1);
    //   console.log(result);
      
    // })
  
  }

  get firstName(){
    return this.signupForm.get('firstName')
  }
  get lastName(){
    return this.signupForm.get('lastName')
  }
  // get middleName(){
  //   return this.signupForm.get('middleName')
  // }
  get email(){
    return this.signupForm.get('username')
  }
  // get dateofbirth(){
  //   return this.signupForm.get('date_of_birth')
  // }
  get mobile(){
    return this.signupForm.get('phoneNo')
  }
  get address(){
    return this.signupForm.get('address')
  }
  // get country(){
  //   return this.signupForm.get('country')
  // }
  // get gender(){
  //   return this.signupForm.get('gender')
  // }

  //  get initialInvestment(){
  //    return this.signupForm.get('initial_investment')
  //  }
  //  get totalmaxrisk(){
  //    return this.signupForm.get('total_max_percentage_risk')
  //  }
  //  get estimatetradingrange(){
  //    return this.signupForm.get('estimated_trading_range')
  //  }
  //  get frequencyoftrades(){
  //    return this.signupForm.get('frequency_of_signal')
  //  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.warn(this.signupForm.value);
    
    this.coreServices.saveuserListItself(this.signupForm.value).subscribe((result)=>{
      console.log("working here")
      //  this.alert = true
       this.successNotification()
        this.loading=false
        
      
      this.signupForm.reset({})
    },(error:any)=>{
      Swal.fire('',error.error.message,'error')

        // console.log(error.error.msg)
    });

    // code to activate container
    this.coreServices.activateContainer().subscribe((result)=>{
      //  this.alert = true
       this.successNotification()
        this.loading=false
      
      
      this.signupForm.reset({})
    },(error:any)=>{
      Swal.fire('',error.error.message,'error')

        // console.log(error.error.msg)
    });

    // code to clone bot
    this.coreServices.cloneBot(this.signupForm.value).subscribe((result)=>{
      //  this.alert = true
       this.successNotification()
        this.loading=false
      
      
      this.signupForm.reset({})
    },(error:any)=>{
      Swal.fire('',error.error.message,'error')

        // console.log(error.error.msg)
    });
  }
  // countryname(){
  //   this.coreServices.getcountry().subscribe((result)=>{
  //     this.country1 = result;
  //     // console.log(this.country1);
  //     // console.log(result);
      
  //   })
  // }
  cancel(){
    this.signupForm.reset({})
  }
  closeAlert(){
    this.alert = false
  }
  successNotification(){
    Swal.fire('Success', 'Your Data has been saved Successfully!', 'success')
  }


  // setDate(): void {
    
  //   let model: IMyDateModel = {isRange: false, singleDate: {jsDate: new Date()}, dateRange: null};
  //    this.signupForm.patchValue({myDate: model});
  // }

  // clearDate(): void {
    
  //   this.signupForm.patchValue({myDate: null});
  // }
  
  
  

}



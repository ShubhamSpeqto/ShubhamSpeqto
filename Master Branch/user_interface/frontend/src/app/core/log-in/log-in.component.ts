import { Component, OnInit } from '@angular/core';
import { CoreServicesService } from '../core-services.service';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})


export class LogInComponent implements OnInit {

  hide = true;
  alert : boolean = false;
  demo = true
  email:string;
  show_button: Boolean = false;
  show_eye: Boolean = false;
  error:String;
  header_visiblity = false;

  constructor(private loginservice : CoreServicesService,
    private fb: FormBuilder,
    
    private router:Router    ) { }

    ngOnInit() {
      
    //  this.email=localStorage.getItem('username')
    }


  loginForm =this.fb.group({
    // username:['',[Validators.required,Validators.pattern( '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$')]],
    username:['',[Validators.required]],
    password:['',[Validators.required]]
    // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]
  });


  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.loginservice.login(this.loginForm.value).subscribe((success:any)=>{      
      // localStorage.setItem('userId', success.data.userId)
      localStorage.setItem('userName', success.username)
      localStorage.setItem('firstName', success.firstName)
      localStorage.setItem('id', success.id)
      localStorage.setItem('jwt',success.token)
      // localStorage.setItem('userEmail', success.data.userEmail)
      // localStorage.setItem('change_password', success.data.change_password)
      // localStorage.setItem('checkKycStatus', success.data.checkKycStatus)
      // localStorage.setItem('userRoleType', success.data.userRoleType)
      
    //   if(success.data.userRoleType=='CAT' || success.data.userRoleType=='Cat' || success.data.userRoleType=='cat'){
      this.header_visiblity = true;
        this.router.navigate(['/dashboard'])
    //   }
    //   else{
      
    //     if(success.data.change_password==false){
    //     // this.router.navigate([''])
    //     this.router.navigate(['/change-password'])
        
    //   }else{
    //     if(success.data.checkKycStatus==null){

    //       this.router.navigate(['/kyc'])
    //     }
    //     else{
    //       if(success.data.checkKycStatus=="Pending"){
    //         this.successNotification();
    //         this.router.navigate(['log-in/'])
    //       }
    //       else{
    //         if(success.data.checkKycStatus=="approve"){
    //           this.router.navigate(['/dashboard'])
    //         }
    //       }
    //     }
        
        
    //   }
    //   this.loginForm.reset({})
    // }
    }
    ,(error:any)=>{
      console.log(error);
      
      // Swal.fire('',error.error.msg,'error')
      //   console.log(error.error.msg)
    }
    )
    
    // this.demo=false;
  }

  
  
  closeAlert(){
    this.alert = false
  }
  successNotification(){
    Swal.fire('', ' Please wait for your kyc Approval', 'warning')
  }
  errormsg(error){
    Swal.fire('',error.error.msg,'warning')
  }
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CoreServicesService } from '../core-services.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
 alert : boolean =false;
 collection : any = []
  constructor(private forgotservice : CoreServicesService,
    private fb: FormBuilder,
    private router:Router,
    ) { }

  ngOnInit() {
  }

  forgotpasswordForm =this.fb.group({
    email:['',[Validators.required]],
    
  });

  onSubmit() {
    console.warn(this.forgotpasswordForm.value.email);

    

    this.forgotservice.forgotPassword(this.forgotpasswordForm.value.email).subscribe((result)=>{
      console.warn(this.forgotpasswordForm.value.email);
      
      this.alert = true
      
    }
    ,(error:any)=>{
      Swal.fire('',error.error.msg,'error')

        console.log(error.error.msg)
    })
    this.forgotpasswordForm.reset({})
    
  }

}

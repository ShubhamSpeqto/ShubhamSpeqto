import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormGroupName,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CoreServicesService } from "src/app/core/core-services.service";
import { FirstService } from "src/app/first.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ErrorHandlingService } from "src/app/error-handling.service";

@Component({
  selector: "app-confirm-password",
  templateUrl: "./confirm-password.component.html",
  styleUrls: ["./confirm-password.component.css"],
})
export class ConfirmPasswordComponent implements OnInit {
  alert: boolean = false;
  userId: string
  userEmail: string;
  checkkycstatus:string
  hide = true;
  inactive :string= 'InActive'
  active:string="active"
  // error:String
  show_button1: Boolean = false;
  show_eye1: Boolean = false;
  show_button2: Boolean = false;
  show_eye2: Boolean = false;
  show_button3: Boolean = false;
  show_eye3: Boolean = false;
  constructor(
    private customValidator: CoreServicesService,
    private fb: FormBuilder,
    private first: FirstService,
    private router: ActivatedRoute,
    private router1: Router,
    private messageService:ErrorHandlingService
  ) { }

  ngOnInit() { 
    this.userId = localStorage.getItem('userId')
    this.userEmail = localStorage.getItem('userEmail')
    this.checkkycstatus = localStorage.getItem('checkKycStatus')
    
    


  }

  changePasswordForm = this.fb.group(
    {
      currentPassword: ["", [Validators.required]],
      changePassword: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
          ),
        ],
      ],
      confPassword: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
          ),
        ],
      ],
    },
    {
      validator: this.customValidator.passwordMatchValidator(
        "password",
        "confirmPassword"
      ),
    }
  );


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.changePasswordForm.value);
    this.first.updatePassword(this.userId,this.userEmail,this.checkkycstatus,this.changePasswordForm.value).subscribe((result:any) => {
      
        console.warn("result", result);
        this.changePasswordForm.reset({});
        // this.alert = true

        if(this.checkkycstatus==null){

          this.router1.navigate(['/kyc'])
        }
        else{
          if(this.checkkycstatus=="Pending"){
            this.successNotification();
            this.router1.navigate(['/log-in'])
            localStorage.removeItem('userId')
            localStorage.clear()
          }
          else{
            if(this.checkkycstatus==this.active){

              this.router1.navigate(['/dashboard'])
            }
            else{
              this.successNotification();
              localStorage.removeItem('userId')
              localStorage.clear()
              this.router1.navigate(['/log-in'])
            }

          }
        }
     
      },(error:any)=>{
        // this.errormserrorg(error)
         Swal.fire('',error.error.msg,'error')

        // console.log(error.error.msg)
        // this.messageService.showErrorMessage(error.error.msg);
        
      }
      );
  }
  errormsg(error){
    Swal.fire('',error.error.msg,'warning')
  }
  closeAlert(){
    this.alert=false
  }

  successNotification(){
    Swal.fire('success', ' Your password is updated successfully', 'success')
  }

  showPassword1() {
    this.show_button1 = !this.show_button1;
    this.show_eye1 = !this.show_eye1;
  }
  showPassword2() {
    this.show_button2 = !this.show_button2;
    this.show_eye2 = !this.show_eye2;
  }
  showPassword3() {
    this.show_button3 = !this.show_button3;
    this.show_eye3 = !this.show_eye3;
  }

  
}

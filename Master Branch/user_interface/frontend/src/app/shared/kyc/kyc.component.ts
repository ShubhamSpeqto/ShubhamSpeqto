import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators,FormBuilder,FormArray } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {FirstService} from '../../first.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css'],
  // adding this code extra 
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class KycComponent implements OnInit {
  values = [];
  // values = [];
  exampleForm: FormGroup;
  myFormValueChanges$;
  KycFirstFormGroup: FormGroup;
  KycSecondFormGroup: FormGroup;
  KycThirdFormGroup: FormGroup;
  // user_id: any='';
  profilePicFileData: any;
  imgURL: string | ArrayBuffer;
  selfieWithIdCardImageData: any;
  bankStatementImageData: any;
  idCardWithImageData: any;
  user_id: string
  userName: any=[]
  address: string
  // jwtToken: string;
  // router: any;
  // userId: string
  // userEmail: string;


  constructor(private fb:FormBuilder,
    private first:FirstService,
    private router:Router) { }
  // collection = {};
  alert : Boolean = false
  error : string
  


  ngOnInit(): void {
    // var user_id = localStorage.getItem('userId')
    this.user_id = localStorage.getItem('userId')
    this.userName = localStorage.getItem('userName')
    this.address = localStorage.getItem('address')
    // this.jwtToken = localStorage.getItem('jwt')


    this.KycFirstFormGroup = this.fb.group({
      name: [''],
      occupation: ['', Validators.required],
      idCardNumber: ['', Validators.required],
      idCardWithImage: ['', Validators.required],
      bankAccountNumber: ['', Validators.required],
      bankStatementImage: ['', Validators.required],
      address: [''],
      selfieWithIdCardImage : ['',Validators.required],
      
      creatorId : ['']

    });

    this.KycSecondFormGroup = this.fb.group({
      
      userAccount: this.fb.array([
      
        this.getUnit()
     ])
     
      
    });
    this.myFormValueChanges$ = this.KycSecondFormGroup.controls['userAccount'].valueChanges;
    
    



    this.KycThirdFormGroup = this.fb.group({
      forecast_course: ['', Validators.required],
      manager_account_balance: ['', Validators.required],
      number_of_manager_inside_him: ['', Validators.required],
      frequency_of_trade: ['', Validators.required],

      
    });
   
     
  }

  ngOnDestroy(): void {
    this.myFormValueChanges$.unsubscribe();
  }
  private getUnit() {
    const numberPatern = '^[0-9.,]+$';
    return this.fb.group({
      account_number: ['', Validators.required],
      
    });
  }

  removevalue(i: number){
    this.values.splice(i,1);
    // removeUnit(i: number) {
      const control = <FormArray>this.KycSecondFormGroup.controls['userAccount'];
      control.removeAt(i);
    // }
  }
  addvalue(){
    // this.values.push({value: ""});
    const control = <FormArray>this.KycSecondFormGroup.controls['userAccount'];
    control.push(this.getUnit());
  }


  // file uploding part start here 
  onSelectFile(event, type) {
    if (event.target.files[0].size > '10240000') {
     console.log("Image size should be less than or equal to 10 MB");
    } else {
    if (event.target.files && event.target.files[0]) {


    if (type == 'selfieWithIdCardImage') {
    let len = event.target.files[0].name.split(".").length
    let filename = event.target.files[0].name.split(".")[len - 1]
    if (filename == "png" || filename == "jpeg" || filename == "jpg" || filename == "JPEG")
    this.selfieWithIdCardImageData = event.target.files[0];
    else
    event.target.files[0] = undefined
    this.selfieWithIdCardImageData = event.target.files[0];
    }


    if (type == 'bankStatementImage') {
    let len = event.target.files[0].name.split(".").length
    let filename = event.target.files[0].name.split(".")[len - 1]
    if (filename == "png" || filename == "jpeg" || filename == "jpg" || filename == "JPEG")
    this.bankStatementImageData = event.target.files[0];
    else
    event.target.files[0] = undefined
    this.bankStatementImageData = event.target.files[0];
    }


    if (type == 'idCardWithImage') {
    let len = event.target.files[0].name.split(".").length
    let filename = event.target.files[0].name.split(".")[len-1]
    if(filename == "png" || filename == "jpeg" || filename == "jpg" || filename == "JPEG")
    this.idCardWithImageData = event.target.files[0];
    else
    event.target.files[0] = undefined
    this.idCardWithImageData = event.target.files[0];
    }
    
    
    }
    }
    }
    
    
  submit1(){}

  submit2(){}
      

  submit3() { 
    if(localStorage.getItem('userId') !=null ){

    
    var data = new FormData();
    if (this.selfieWithIdCardImageData) {
      data.append('selfieWithPassport', this.selfieWithIdCardImageData);
      // console.log(selfieIdCardImage);
      
      
      }
    if(this.bankStatementImageData){
      data.append('bankStatementImage', this.bankStatementImageData);
      // console.log(StatementImage);

    }
    if(this.idCardWithImageData){
      data.append('passportImage', this.idCardWithImageData);
      // console.log(idCardImage);

    }
    

      this.first.savekyc(this.user_id,data, this.KycFirstFormGroup.value, this.KycSecondFormGroup.value, this.KycThirdFormGroup.value ).subscribe(
        (success: any) => {
          localStorage.setItem('bankStatementImageurl', success.data.bankStatementImageurl)
          localStorage.setItem('idCardWithImageurl', success.data.idCardWithImageurl)
          localStorage.setItem('selfieWithIdCardImageurl', success.data.selfieWithIdCardImageurl)
          console.log(success);
          localStorage.removeItem('userId')
          localStorage.clear()
          this.successNotification();
          this.KycFirstFormGroup.reset({})
          this.router.navigate(['/log-in'])
        },(error:any)=>{
          Swal.fire('',error.error.message,'error')
    
            console.log(error.error.error)
        })
      }
      else{
        this.router.navigate(['/log-in'])
      }

      
    }
    successNotification(){
      Swal.fire('Success', 'Your Kyc has been saved Successfully! Please wait for Approval', 'success')
    }

}
  

  
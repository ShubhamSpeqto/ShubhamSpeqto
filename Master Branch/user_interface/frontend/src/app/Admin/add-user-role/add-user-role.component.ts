import { Component, OnInit } from '@angular/core';
import { CoreServicesService } from '../../core/core-services.service';
import { FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.css']
})
export class AddUserRoleComponent implements OnInit {

  constructor(private fb: FormBuilder,private coreServices: CoreServicesService) { }
  alert : Boolean = false

  ngOnInit() {
  }

  addrolemanagementForm =this.fb.group({
    role:['',[Validators.required]],
  })
  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.warn(this.signupForm.value);
    //  this.coreServices.saveUserList(this.addrolemanagementForm.value).subscribe((result)=>{
    //   this.alert = true
    // })
    this.addrolemanagementForm.reset({})
  }
  closeAlert(){
    this.alert = false
  }
}



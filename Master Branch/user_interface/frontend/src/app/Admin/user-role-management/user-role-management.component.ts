import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
@Component({
  selector: 'app-user-role-management',
  templateUrl: './user-role-management.component.html',
  styleUrls: ['./user-role-management.component.css']
})
export class UserRoleManagementComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
  }

  userrolemanagementForm =this.fb.group({
    // role:['',[Validators.required]],
    write:[''],
    read: [''],
    delete: [''],
  })
   
  onSubmit(data) {
    // TODO: Use EventEmitter with form value
    // console.warn(this.signupForm.value);
    // this.coreServices.saveuserList(this.signupForm.value).subscribe((result)=>{
    //   this.alert = true
    // })
    console.warn(data);
    
  }

}

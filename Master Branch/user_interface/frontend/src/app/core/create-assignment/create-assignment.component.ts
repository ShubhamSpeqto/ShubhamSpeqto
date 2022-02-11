import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CoreServicesService } from '../core-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {
  userid: string;
  collection:any=[]

  constructor(private fb : FormBuilder,
    private coreservice : CoreServicesService,
    private router : Router) { }

  ngOnInit() {
    this.userid = localStorage.getItem('userId')
    this.getuserlist()
  }
  CreateAssignmentForm = this.fb.group({
    assignedUser : ['',[Validators.required]],
    assignmentDescription : ['',[Validators.required]],
    assignmentName : ['',[Validators.required]],
    // createdBy : ['']

  })

  cancel(){
    this.CreateAssignmentForm.reset({})
  }
  backbutton(){
    this.router.navigate(['dashboard/assignment-list'])
  }
  onSubmit(){
    this.coreservice.createAssignment(this.CreateAssignmentForm.value).subscribe((result)=>{
      
      Swal.fire("success","Assignment Created SuccessFully","success")
      this.CreateAssignmentForm.reset({})
    },(error:any)=>{
      Swal.fire('',error.error.message,'error')

        console.log(error.error.message)
    })

   

  }
  getuserlist(){
    this.coreservice.getteamlist(localStorage.getItem('userId')).subscribe((result)=>{
      this.collection = result;
      console.log(result);
      console.log(this.collection);
      
    })
  }
}

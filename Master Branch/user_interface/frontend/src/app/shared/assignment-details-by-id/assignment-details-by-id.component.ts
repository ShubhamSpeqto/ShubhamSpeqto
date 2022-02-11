import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-assignment-details-by-id',
  templateUrl: './assignment-details-by-id.component.html',
  styleUrls: ['./assignment-details-by-id.component.css']
})
export class AssignmentDetailsByIdComponent implements OnInit {
  collection: any;
  collection1: string;
  // collection: any=[];

  constructor(private sharedservice :SharedService,
    private router : ActivatedRoute,
    private fb : FormBuilder,
    private route : Router) { }

  ngOnInit() {
    this.assignmentlistid()
  }
  CreateAssignmentForm = this.fb.group({
    assignedUser : [''],
    assignmentName : [''],
    assignmentDescription : [''],
  })

  assignmentlistid(){
    this.sharedservice.asignmentlistbyid(this.router.snapshot.params.assignment_id).subscribe((result:any)=>{
      console.log(result);
      // console.log(result.assigned_user);
      // console.log(result.assignment_name);
      this.collection = result.assigned_user
      this.collection1 = result.assignment_name
      console.log(this.collection);
      console.log(this.collection1);
      
      
      this.CreateAssignmentForm = this.fb.group({
         assignedUser: [result['assignment_name']],
        assignmentName: [result['assignment_name']],
        assignmentDescription: [result['assignment_description']],
    })
    })
  }
  cancel(status){

  }
  onSubmit(status){

  }
  backbutton(){
    this.route.navigate(['dashboard/assignment-list'])

  }

}

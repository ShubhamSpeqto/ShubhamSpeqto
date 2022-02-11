import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-email-user-activate',
  templateUrl: './email-user-activate.component.html',
  styleUrls: ['./email-user-activate.component.css']
})
export class EmailUserActivateComponent implements OnInit {
  collection: String;
  collection1: String;
  token: any;
  emailId: any;

  constructor(private sharedservice:SharedService,
    private router : ActivatedRoute,
    private router1 : Router
     ) {}

  ngOnInit() {
    this.token = this.router.snapshot.params.token
    this.emailId = this.router.snapshot.params.emailId
    this.useractivate1()
    
  }
  useractivate1(){
      this.sharedservice.useractivate(this.token,this.emailId).subscribe((result)=>{
      }
    )}
   onSubmit(){
     this.router1.navigate(['/log-in'])
   }

}

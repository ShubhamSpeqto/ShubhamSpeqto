import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-cat-create-signal',
  templateUrl: './cat-create-signal.component.html',
  styleUrls: ['./cat-create-signal.component.css']
})
export class CatCreateSignalComponent implements OnInit {
  userid: string
  userEmail: string;

  constructor( private fb: FormBuilder,
    private service: AdminServiceService) { }

  ngOnInit() {
    this.userid = localStorage.getItem('userId')
    this.userEmail = localStorage.getItem('userEmail')
  }
  CatSignalForm = this.fb.group(
    {
      chart: ["", [Validators.required]],
      entry: ["", [Validators.required]],
      pip: ["", [Validators.required]],
      price: ["", [Validators.required]],
      type: ["", [Validators.required]],
      symbol: ["", [Validators.required]],
      zone: ["", [Validators.required]],
      comment: ["", [Validators.required]],

});

onSubmit(){
  this.service.savecatsingal(this.userid,this.CatSignalForm.value).subscribe((result:any) => {
      
    console.warn("result", result);
    this.CatSignalForm.reset({});
    // this.alert = true
}
  )}

cancel(){
  this.CatSignalForm.reset({})
}

}

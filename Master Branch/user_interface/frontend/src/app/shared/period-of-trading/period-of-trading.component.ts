import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule,FormControl } from '@angular/forms';

@Component({
  selector: 'app-period-of-trading',
  templateUrl: './period-of-trading.component.html',
  styleUrls: ['./period-of-trading.component.css']
})
export class PeriodOfTradingComponent implements OnInit {
  
  POTForm = new FormGroup({
    starting: new FormControl(''),
    Ending: new FormControl(''),
    
  });

  constructor() { }
  ngOnInit() {
  }
  // BirthDate:Date;
  // constructor(private formBuilder: FormBuilder) {}
  // ngOnInit() {
  //   this.BirthDate = new Date();
  //   this.registerForm = this.formBuilder.group({
  //   BirthDate : ''
  //   });
  // }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.POTForm.value);
  }



}

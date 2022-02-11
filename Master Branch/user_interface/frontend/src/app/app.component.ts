import { Component,OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
//  import { TableData } from 'table-data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Pirate ArbBot';
  user_id: string;
  token: string;
  



  ngOnInit() {

    setInterval(()=>{
      this.user_id = localStorage.getItem('userId')
      this.token = localStorage.getItem('jwt')
    },1000)
       
  }
  
}

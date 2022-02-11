import { Injectable,Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CoreGuardGuard implements CanActivate  {
  userId: string
  ngOnInit() {
  
    this.userId = localStorage.getItem('userId')
  }
  constructor(private router:Router) { }
  canActivate(): boolean {

      if(localStorage.getItem('userId')!=null){
        return true
      }
      else{

        this.router.navigate(['/log-in'])
        // return false;
      }


      //Authentication and authrization code is here
      // calling a user service - pass user/pwd and make sure user is correct 

  }
  
}

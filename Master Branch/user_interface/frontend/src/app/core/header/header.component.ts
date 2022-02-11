import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import { trigger, transition, state, animate, style } from '@angular/animations';
import { CoreServicesService } from '../core-services.service';
import { takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import{BehaviorSubject, Observable,throwError} from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('childAnimation', [
      // ...
      state('open', style({
        width: '250px',
        // opacity: 1,
        // backgroundColor: 'yellow'
      })),
      state('closed', style({
        width: '100px',
        // opacity: 0.5,
        // backgroundColor: 'green'
      })),
      transition('* => *', [
        animate('0.2s')
      ]),
    ]),
    trigger('contentAnimation', [
      // ...
      transition('* => *', [
        animate('1s')
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit ,OnDestroy{
  user_id:String;
  token: string;
  isOpen = false;
  private desotryed$: Subject<boolean> = new Subject();
  public currentUser$: BehaviorSubject<any> = new BehaviorSubject(this.hasToken()); // initial state is "null" => user is not logged in
  isSignedIn: boolean;
  showHead: boolean = false;
  username = '';

  constructor(fb: FormBuilder,
    private loginservice : CoreServicesService,
    private router:Router ) {

    
    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/log-in' || event['url'] == '/sign-up-itself') {
          this.showHead = false;
        } else {
          // console.log("NU")
          this.showHead = true;
        }
      }
    });
  }

  private hasToken() : boolean {
    return !!sessionStorage.getItem('jwt');
  }
  ngOnInit() {
    
    this.loginservice.isSignedIn$.pipe(takeUntil(this.desotryed$))
     // to prevent memory leaks through a perpetual subscription
    .subscribe(isSignedIn => {
      this.isSignedIn = isSignedIn;      
    });
    this.kyc();
    this.username = localStorage.getItem('firstName');
    
  }

  kyc(){
    console.log("result get out");
  }
  
  ngOnDestroy() {
    this.desotryed$.next(true);
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }
  logout(){
    localStorage.clear();
    localStorage.removeItem('userName')
    sessionStorage.clear();
    this.currentUser$.next(null); // will automatically trigger the logged-in state as well 
    this.router.navigate(['/log-in'])
}
  // logout(){
  //   localStorage.removeItem('userName');
  //   localStorage.removeItem('jwt');
  //   sessionStorage.clear();
  //   this.router.navigate(['/log-in'])
  // }
  

  }
  




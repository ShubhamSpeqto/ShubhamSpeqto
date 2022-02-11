import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpComponent} from './core/sign-up/sign-up.component'
import {LogInComponent} from './core/log-in/log-in.component'
import {ForgotPasswordComponent} from './core/forgot-password/forgot-password.component'
import {ConfirmPasswordComponent} from './shared/confirm-password/confirm-password.component'
import {KycComponent} from './shared/kyc/kyc.component'
import {PeriodOfTradingComponent} from './shared/period-of-trading/period-of-trading.component'
import {AddUserRoleComponent} from './Admin/add-user-role/add-user-role.component'
import {AdminKycComponent} from './Admin/admin-kyc/admin-kyc.component'
import {HeaderComponent} from './core/header/header.component'
import { MainHeaderComponent } from './core/main-header/main-header.component';
import {AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component'
import { UserLoginItselfComponent} from './shared/user-login-itself/user-login-itself.component'
import { UserKycListComponent } from './shared/user-kyc-list/user-kyc-list.component';
import { UserKycList1Component } from './shared/user-kyc-list1/user-kyc-list1.component';
import { CatCreateSignalComponent } from './Admin/cat-create-signal/cat-create-signal.component';
import { CoreGuardGuard } from './core/core-guard.guard';
import { UserListComponent } from './shared/user-list/user-list.component';
import { UserListByIdComponent } from './shared/user-list-by-id/user-list-by-id.component';
import {EmailUserActivateComponent } from './shared/email-user-activate/email-user-activate.component'
import { CreateAssignmentComponent } from './core/create-assignment/create-assignment.component';
import { AssignmentListComponent } from './shared/assignment-list/assignment-list.component';
import { AssignmentDetailsByIdComponent } from './shared/assignment-details-by-id/assignment-details-by-id.component';
import { DashboardComponent } from './Hunter/dashboard/dashboard.component';
import { BoardComponent } from './board/board.component';
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { OrderEngineComponent } from "./order-engine/order-engine.component";

const routes: Routes = [
  {path:'',redirectTo:'/log-in',pathMatch:'full'},
  
  
  
  {
    component : UserLoginItselfComponent,
    path : 'sign-up-itself'
  },
  {
    component : AdminDashboardComponent,
    path : 'admin-dashboard',
    canActivate:[CoreGuardGuard]
  },
  //  {
  //    component : SignUpComponent,
  //    path : 'sign-up',
  //    canActivate:[CoreGuardGuard]
  //  },
  {
    // component : HeaderComponent,
    path : 'dashboard',component:BoardComponent
  },
  {
    path : 'assignment-list/:assignment_id',component : AssignmentDetailsByIdComponent
  },
  {
    component : LogInComponent,
    path : 'log-in'
  },
  {path:'sign-up', component : SignUpComponent},
  {path : 'kyc',component : KycComponent},
  {path : 'create-assignment',component : CreateAssignmentComponent},
  {path: "assignment-list",component: AssignmentListComponent},
  {path : 'user-kyc-list',component : UserKycListComponent,children:[
    // {path:':kyc_id',component:UserKycList1Component}
  ]},
  // {path : 'user-kyc-list/:kyc_id',component : UserKycList1Component},
  {path : 'user-list',component : UserListComponent},
  {path : 'user-list/:userId',component : UserListByIdComponent},
  {
    path : 'forgot-password',
    component : ForgotPasswordComponent,

  },
  {
    path : 'user-kyc-list/:kyc_id',component : UserKycList1Component
  },
  {path : 'kyc',component : KycComponent,canActivate:[CoreGuardGuard]},
  
  
  
  
  {
    component : ConfirmPasswordComponent,
    path : 'change-password',
    canActivate:[CoreGuardGuard]
  },
  {
    component : PeriodOfTradingComponent,
    path : 'tranding-period',
    canActivate:[CoreGuardGuard]
  },
  {
    component : AddUserRoleComponent,
    path : 'user-role-management',
    canActivate:[CoreGuardGuard]
  },
  {
    component : AdminKycComponent,
    path : 'admin-kyc'
  },
  {
    component: CatCreateSignalComponent,
    path : "cat-signal-create"
  },
  {
    component: EmailUserActivateComponent,
    path : "User-Activate/:token/:emailId"
  },
  {
    path: "user-profile",
    component: UserProfileComponent,
  },
  {
    path: "order-engine",
    component: OrderEngineComponent,
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

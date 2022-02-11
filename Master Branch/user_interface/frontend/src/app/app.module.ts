import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './core/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LogInComponent } from './core/log-in/log-in.component'
import { HttpClientModule } from '@angular/common/http';
import { KycComponent } from './shared/kyc/kyc.component';
import { DashboardComponent } from './Hunter/dashboard/dashboard.component';
import { PeriodOfTradingComponent } from './shared/period-of-trading/period-of-trading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatPaginatorModule, MatSelectModule } from '@angular/material';
import { HeaderComponent } from './core/header/header.component';
import { ConfirmPasswordComponent } from './shared/confirm-password/confirm-password.component';
import { AdminKycComponent } from './Admin/admin-kyc/admin-kyc.component';
import { UserRoleManagementComponent } from './Admin/user-role-management/user-role-management.component';
import { AddUserRoleComponent } from './Admin/add-user-role/add-user-role.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatStepperModule} from '@angular/material/stepper';
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { MainHeaderComponent } from './core/main-header/main-header.component';
import { ForgotPasswordComponent } from './core/forgot-password/forgot-password.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UserLoginItselfComponent } from './shared/user-login-itself/user-login-itself.component';
import { UserKycListComponent } from './shared/user-kyc-list/user-kyc-list.component';
import { UserListComponent } from './shared/user-list/user-list.component';
import { UserKycList1Component } from './shared/user-kyc-list1/user-kyc-list1.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination'
import { CatCreateSignalComponent } from './Admin/cat-create-signal/cat-create-signal.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { UserListByIdComponent } from './shared/user-list-by-id/user-list-by-id.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
// import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EmailUserActivateComponent } from './shared/email-user-activate/email-user-activate.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { CreateAssignmentComponent } from './core/create-assignment/create-assignment.component';
import { AssignmentListComponent } from './shared/assignment-list/assignment-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatListModule} from '@angular/material/list';
import { AssignmentDetailsByIdComponent } from './shared/assignment-details-by-id/assignment-details-by-id.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { BoardComponent } from './board/board.component';
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { OrderEngineComponent } from "./order-engine/order-engine.component";




const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };



@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    KycComponent,
    DashboardComponent,
    PeriodOfTradingComponent,
    HeaderComponent,
    ConfirmPasswordComponent,
    AdminKycComponent,
    UserRoleManagementComponent,
    AddUserRoleComponent,
    AdminDashboardComponent,
    MainHeaderComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    UserLoginItselfComponent,
    UserListComponent,
    UserKycListComponent,
    UserKycList1Component,
    UserListComponent,
    UserListComponent,
    UserKycListComponent,
    CatCreateSignalComponent,
    UserListByIdComponent,
    EmailUserActivateComponent,
    CreateAssignmentComponent,
    AssignmentListComponent,
    SidenavComponent,
    AssignmentDetailsByIdComponent,
    BoardComponent,
    UserProfileComponent,
    OrderEngineComponent,
    
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatIconModule,
      MatBadgeModule,
      MatTabsModule,
      MatButtonModule,
    SocketIoModule.forRoot(config),
    MatStepperModule,
    MatInputModule,
    MatCheckboxModule,
    MatDividerModule,
    MatCardModule,
    MatExpansionModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    MatToolbarModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    TabsModule,
    Ng2TelInputModule,
    MatSelectModule,
    SweetAlert2Module,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    AngularMyDatePickerModule,
    MatMenuModule,
    
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

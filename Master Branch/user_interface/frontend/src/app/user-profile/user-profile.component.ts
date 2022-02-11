import { Component, OnInit } from '@angular/core';
import { UserInfoService } from './user-info.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  // maxDate = new Date();
  // profilePicFileData: File;
  // imgURL: any;
  // country: Array<any> = [];
  country: string;
  // date: Date;
  phoneNo: string;
  userId: string;
  userName: string;
  address: string;
  jwt: string;
  firstName: string;
  lastName: string;
  // profilepic: string;
  constructor(private userInfo:UserInfoService
    ){}




  ngOnInit(): void {
    //  this.getCountryList();
    this.userId = localStorage.getItem('id');
    // this.userName = localStorage.getItem('userName');
    // this.address = localStorage.getItem('address');
    this.jwt = localStorage.getItem('jwt');
    // this.firstName = localStorage.getItem('firstName');
    // localStorage.getItem('change_password');
    // localStorage.getItem('checkKycStatus');
    this.getuserProfile(this.userId, this.jwt);
    // this.userRoleType = localStorage.getItem('userRoleType');
    // this.profilepic = localStorage.getItem('profilepic');
    //  this.getUserDocFils(); 
  }



getuserProfile(userId, jwt) {
  // this.spinner.show();
  this.userInfo.getUser(userId, jwt).subscribe(
    (success: any) => {
      console.log(success);
      
      if(success.id){
        console.log(success)
        this.firstName = success.firstName;
        this.lastName =  success.lastName;
        this.userName = success.username;
        this.address = success.address;
        this.phoneNo = success.phoneNo;
        this.country = success.country;
        // if(success.data.gender == null){
        //   this.tutorData.gender = ""
        // }
        
      }
      // this.spinner.hide();
    }, (error: any) => {
      console.log(error)
      // this.spinner.hide();
      // this.messageService.showErrorMessage(error);
    })
}
// submitTutorProfile(tutorData) {
//   this.spinner.show();
//   this.studentProfileService.savetutorData(tutorData).subscribe(
//     (success: any) => {
//        this.messageService.success(success.message);
//        this.spinner.hide();
//     }, (error: any) => {
//       this.spinner.hide();
//       this.messageService.showErrorMessage(error);
//     })
// }
// selectCountryCode(countryId: any): void {
//   for (const country of this.countries) {
//     if (+countryId === country.countryId) {
//       this.tutorData.phoneCode = country.phoneCode;
//     }
//   }
// }
// uploadDoc(tutordata) {
//   this.spinner.show();
//   if (this.profilePicFileData) {
//     const formData = new FormData();
//     formData.append('file', this.profilePicFileData);
//     formData.append('documentType', "PROFILE_PIC");
//     formData.append('idProofType', "UTILITY_BILLS");
//     this.studentProfileService.uploadProfilePicture(tutordata, formData).subscribe(
//       (success: any) => {
//         this.spinner.hide();
//           // this.messageService.success(success.message);

//       }, (error: any) => {
//         this.spinner.hide();
//           this.messageService.showErrorMessage(error);
//       })

//   }
 
// }
// getUserDocFils() {
//   this.spinner.show();
//   this.studentProfileService.getUserDocument('PROFILE_PIC')
//     .subscribe(
//       (success: any) => {
//           this.imgURL = success.data.documentUrl;
//           this.spinner.hide();
//       }, (error: any) => {
//         this.spinner.hide();
//       });
// }

//     onSelectFile(event, type) {
//       if(event.target.files[0].size > '10240000'){
//         this.toasterService.error("Image size should be less than or equal to 10 MB");
//       }else{
//       if (event.target.files && event.target.files[0]) {
//         if (type == 'tutorProfileImg') {
//           let len = event.target.files[0].name.split(".").length
//           let filename = event.target.files[0].name.split(".")[len-1]
//           if(filename == "png" || filename == "jpeg" || filename == "jpg")
//           this.profilePicFileData = event.target.files[0];
//           else
//           event.target.files[0] = undefined
//         }
//         var reader = new FileReader();
//         reader.readAsDataURL(event.target.files[0]);
//         reader.onload = (event) => {
//           if (type == 'tutorProfileImg') {
//             this.imgURL = reader.result;
//           }
  
//         }
//       }
//     }
  
//     }
   }

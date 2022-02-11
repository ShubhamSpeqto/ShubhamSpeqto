// var base_url = "http://localhost:4000/";
var base_url = "http://18.215.193.111:4000/";

export const URLS = {
    // core part start here 
    signup : base_url+"users/register",
    login  : base_url+"users/authenticate",
    getUserById: base_url+"users",
    getOandaAccount:"https://api-fxpractice.oanda.com/v3/accounts/",
    forgotPassword: "",
    header: "",
    // GetCountry : "",
    CreateAssignment: "",
    // core part end here

    // shared part start here 
    getalluser : "",

    GetTeamUser : "",

    getuserlistbyid : "",

    updateuserlistbyid : "",

     saveKycList : "",
    // saveKycList : "",

    getkyclist:"",

    getKycListById : "",

    updateUserKyc :"",
    
    changePassword : "",

    userActivate : "",
    
    useractivatinglink: "",

    assignmentlist: "",

    assignmentlistById: "",

    // shared aprt end here

    // admin part  start here

    SaveCatSignal:"",
    // admin part  End here
}
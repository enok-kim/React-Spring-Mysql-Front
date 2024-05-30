 enum ResponseCode {

  SUCCESS = "SU",
    //HTTP Status 400
     VALLIDATION_FAILED = "VF",
     DUPLICATE_EMAIL = "DE",
     DUPLICATE_NICKNAME = "DN",
     DUPLICATE_TEL_NUMBER = "DT",
     NOT_EXISITED_USER = "NU",
     NOT_EXISITED_BOARD = "NB",
  
    //HTTP status 401
     SIGN_IN_FAIL = "SF",
     AUTHORIZATION_FAIL = "AF",
  
    //HTTP Status 403
     NO_PERMISSION = "NP",
  
    //HTTP Status 500
     DATABASE_ERROR = "DE",

 }
 export default ResponseCode;
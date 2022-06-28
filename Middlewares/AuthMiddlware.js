const _JwtServices = require('../Services/TokenService')

const AuthJwt = (req,res,next) =>{
    let result =  _JwtServices.VerifyTokenAndGetId(req)
    if(result.IsSuccess){
        //console.log(result)
        next()
    }
    else{
     console.log(result.error)
     res.status(401).send({
         message : "Jwt is not valid or user doesn't exist",
         error : result.Error 
     })
    }
 }

 module.exports =  AuthJwt
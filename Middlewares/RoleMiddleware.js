const _JwtServices = require('../Services/TokenService')
const _UserDomain = require('../Domain/UserDomain')
const _UserContext = require('../Datastore/UserModel')
const UserDomain = new _UserDomain(_UserContext)

class RoleMiddleware{    
    constructor(Role){
        this._role  = Role
    }

    VerifyRoleAsync = async(req,res,next) =>{
        let result =  _JwtServices.VerifyTokenAndGetId(req)
        if(result.IsSuccess){
            let user = await UserDomain.GetUserByIdAsync(result._id)
            let found = false
            for(let i of user.roles){
                if(i == this._role){
                    found = true
                }
            }
            if(found){
                next()
            }else{
                res.status(401).send({
                    message : "role is not valid",
                })
            }
        }
        else{
         console.log(result.error)
         res.status(401).send({
             message : "Jwt is not valid or user doesn't exist",
             error : result.Error 
         })
        }
    }
 }

 module.exports =  RoleMiddleware
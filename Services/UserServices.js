const _JwtServices  = require('./TokenService')
const _UserDomain = require('../Domain/UserDomain')
const _UserContext = require('../Datastore/UserModel')
const UserDomain = new _UserDomain(_UserContext)


class UserServices{

    AddUserAsync = async(body) =>{
        try{
            let result = await UserDomain.CreateUserAsync(body);
            let token  = await _JwtServices.SignToken(result.Item.id);
            return {Token : token}
        }catch(exception){
            console.log(exception)
            return {Token : null}
        }
    }

    GetUserTokenAsync = async(id) =>{
        try{
            let result = await UserDomain.GetUserByIdAsync(id);
            let token  = await _JwtServices.SignToken(result._id);
            return {Token : token}
        }catch(exception){
            console.log(exception)
            return {Token : null}
        }

    }


}

module.exports = new UserServices()
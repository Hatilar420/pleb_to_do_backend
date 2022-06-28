class UserDomain {

    constructor(UserContext){
        this._UserContext = UserContext
    }


    GetAllUsersAsync = async () =>{
        return await this._UserContext.find()
    }

    GetUserByIdAsync = async(id) =>{
        return await this._UserContext.findById(id)
    }

    CreateUserAsync = async(obj) =>{
        let ItemPost = this._UserContext(obj)
        try{
            let result = await ItemPost.save();
            console.log(result)
            return {IsSuccess : true,Item : result, Errors : null}
        }catch (error) {
            console.log(error)
            return {IsSuccess : false, Item : null , Errors : error }
        }
    }

    DeleteUserAsync = async(id_or_name) =>{
        try{
            let Item = await this.GetUserByIdAsync(id_or_name)
            if(Item != null){
                let result = await this._UserContext.deleteOne({_id : id_or_name});
                console.log(result)
                return true
            }
            else{
                return false
            }
        }
        catch(exception){
            console.log(exception)
            return false
        }       
    }

    UpdateUserAsync = async ( Id,changed_data) =>{
        try{
            changed_data.due_date = new Date(changed_data.due_date)
            console.log(changed_data)
            let result = await this._UserContext.updateOne({_id : Id},changed_data)
            console.log(result)
            return {IsSuccess : true, Result : result}
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false, Error : exception}
        }
    }
    
}


module.exports = UserDomain
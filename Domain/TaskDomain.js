class TaskDomain {

    constructor(TaskContext){
        this._TaskContext = TaskContext
    }


    GetAllTasksAsync = async () =>{
        return await this._TaskContext.find()
    }

    GetTaskByIdAsync = async(id) =>{
        return await this._TaskContext.findById(id)
    }

    GetTaskByUserIdAsync = async(user_id) =>{
        return await this._TaskContext.find({
            userId : user_id
        })
    }

    CreateTaskAsync = async(obj) =>{
        let ItemPost = this._TaskContext(obj)
        try{
            let result = await ItemPost.save();
            console.log(result)
            return {IsSuccess : true,Item : result, Errors : null}
        }catch (error) {
            console.log(error)
            return {IsSuccess : false, Item : null , Errors : error }
        }
    }

    DeleteTaskAsync = async(id_or_name) =>{
        try{
            let Item = await this.GetTaskByIdAsync(id_or_name)
            if(Item != null){
                let result = await this._TaskContext.deleteOne({_id : id_or_name});
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

    UpdateTaskAsync = async ( Id,changed_data) =>{
        try{
            changed_data.due_date = new Date(changed_data.due_date)
            console.log(changed_data)
            let result = await this._TaskContext.updateOne({_id : Id},changed_data)
            console.log(result)
            return {IsSuccess : true, Result : result}
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false, Error : exception}
        }
    }
    
}


module.exports = TaskDomain
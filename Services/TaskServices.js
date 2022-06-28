const TaskContext = require('../Datastore/TaskModel')
const _TaskDomain = require('../Domain/TaskDomain')
const TaskDomain = new _TaskDomain(TaskContext)
const jwtService = require('./TokenService')
const _UserDomain = require('../Domain/UserDomain')
const _UserContext = require('../Datastore/UserModel')
const UserDomain = new _UserDomain(_UserContext)


class TaskServices{

    createTaskAsync = async(req) =>{
        let user_id = jwtService.VerifyTokenAndGetId(req)
        req.body.userId = user_id._id
        req.body.due_date = new Date(req.body.due_date)
        return await TaskDomain.CreateTaskAsync(req.body)
    }

    GetTasksByUserIdAsync = async(req) =>{
        let user_id = jwtService.VerifyTokenAndGetId(req)
        return await TaskDomain.GetTaskByUserIdAsync(user_id._id)
    }

    GetTasksByUserIdAndStatusAsync = async(req) =>{
        let user_id = jwtService.VerifyTokenAndGetId(req)
        let tasks = await TaskDomain.GetTaskByUserIdAsync(user_id._id)

        let obj = {
            "Completed" : [],
            "Due": [],
            "Today" : [],
            "Yesterday" : [],
            "Overdue" : [],
            "Home" : [],
            "Personal" : [],
            "Office" : []
        }

        let currDate = new Date()

        for(let i of tasks){
            if(i.completed){
                obj['Completed'].push(i)
            }
            let dueDate = i.due_date
            let UtcLeft = Math.floor(dueDate.getTime() / 1000) - Math.floor(currDate.getTime() / 1000)
            if (UtcLeft < 0){
                //yesterday or overdue
                if( (currDate.getDate() - dueDate.getDate()) == 1 ){
                    obj['Yesterday'].push(i)
                }else if((currDate.getDate() - dueDate.getDate()) == 0){
                    obj['Today'].push(i)
                }else{
                    obj['Overdue'].push(i)
                }
            }else{
                if( ( dueDate.getDate() - currDate.getDate() ) == 0 ){
                    obj['Today'].push(i)
                }else{
                    obj['Due'].push(i)
                }
            }
            if(i.tags.indexOf('Home') != -1){
                obj['Home'].push(i)
            }
            if(i.tags.indexOf('Office') != -1){
                obj['Office'].push(i)
            }  
            if(i.tags.indexOf('Personal') != -1){
                obj['Personal'].push(i)
            }  
        }
        return obj
    }

    GetAllUsersTasks = async () =>{
        let AllUsers = await UserDomain.GetAllUsersAsync()
        let ret = []
        for(let i of AllUsers){
            let obj = {}
            obj['name'] = i.name
            obj['tasks'] = await TaskDomain.GetTaskByUserIdAsync(i._id)
            ret.push(obj)
        }
        return ret
    }

}

module.exports = new TaskServices()
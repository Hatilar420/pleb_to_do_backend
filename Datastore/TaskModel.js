const mongoose  =  require('mongoose');
const {Schema} =  mongoose

let TaskSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    due_date : {
        type : Date,
        required : true
    },
    created_date : {
        type: Date,
        required : true,
        default: Date.now()
    },
    completed :{
        type : Boolean ,
        default:false
    },
    tags : [{
        type:String
    }],
    userId : {
        type:String,
        required:true
    }
})

let TaskModel =  mongoose.model("Tasks",TaskSchema);

module.exports = TaskModel
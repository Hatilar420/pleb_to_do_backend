const mongoose  =  require('mongoose');
const {Schema} =  mongoose

let UserSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    roles:[
        {
            type: String,
            required : true
        }
    ],
})

let UserModel =  mongoose.model("Users",UserSchema);

module.exports = UserModel